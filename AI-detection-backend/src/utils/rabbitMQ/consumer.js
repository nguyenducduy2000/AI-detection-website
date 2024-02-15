const amqlib = require('amqplib');
const getConnect = require('../Database');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

let conn;

const createConnection = async () => {
    if (!conn) {
        conn = await amqlib.connect(process.env.AMQP_URL_CLOUD);
    }
};

const receiveMessage = async () => {
    try {
        // 1. create Connect
        await createConnection(); // Create or reuse the connection

        // 2. create Channel
        const channel = await conn.createChannel();

        // 3. create name queue
        const nameQueue = process.env.AMQP_MESSAGE_QUEUE;

        // 4. create Queue
        await channel.assertQueue(nameQueue, {
            durable: true,
        });

        // 5. receive from queue
        await channel.consume(nameQueue, async (msg) => {
            const dbconn = await getConnect();
            try {
                objectArray = [];
                eventArray = [];
                // Add the required SQL queries to check if the IDs exist

                const data = await JSON.parse(msg.content.toString());
                // console.log('Msg::::', data);
                // channel.ack(msg);
                await Promise.all([
                    // Check if the camera_id exists
                    dbconn.query('SELECT * FROM camera WHERE camera_id = ?', [data.camera.id]),
                    // Check if the model_id exists
                    dbconn.query('SELECT * FROM model WHERE model_id = ?', [data.model.id]),
                    // Check if the location_id exists
                    dbconn.query('SELECT * FROM location WHERE location_id = ?', [data.location.id]),
                ]).then(([cameraResult, modelResult, locationResult]) => {
                    // console.log('cameraResult: ', cameraResult[0]);
                    // console.log('modelResult: ', modelResult[0]);
                    // console.log('locationResult: ', locationResult[0]);
                    // If any of the result sets are empty, it means the corresponding IDs don't exist
                    const isCameraExists = cameraResult[0].length > 0;
                    const isModelExists = modelResult[0].length > 0;
                    const isLocationExists = locationResult[0].length > 0;

                    console.log(isCameraExists, isModelExists, isLocationExists);

                    if (!isCameraExists) {
                        // Insert new data to the camera table
                        // console.log('Insert new data to the camera table');
                        dbconn.query('INSERT IGNORE INTO camera (camera_id, type, description) VALUES (?,?,?)', [
                            data.camera.id,
                            data.camera.type,
                            data.camera.description,
                        ]);
                    }

                    if (!isModelExists) {
                        // Insert new data to the model table
                        // console.log('Insert new data to the model table');
                        dbconn.query('INSERT IGNORE INTO model (model_id, description) VALUES (?,?)', [
                            data.model.id,
                            data.model.description,
                        ]);
                    }

                    if (!isLocationExists) {
                        // Insert new data to the location table
                        // console.log('Insert new data to the location table');
                        dbconn.query('INSERT IGNORE INTO location (location_id, lat, lon, alt) VALUES (?,?,?,?)', [
                            data.location.id,
                            data.location.lat,
                            data.location.lon,
                            data.location.alt,
                        ]);
                    }
                });
                // Put object_list data into an Array
                data.object_list.forEach((obj) => {
                    const objectType = Object.keys(obj)[0];
                    const objectData = Object.values(obj)[0];

                    // Create the SQL INSERT statement based on the object type and data
                    const messageObject = {
                        message_id: data.message_id,
                        object_id: objectData.id,
                        object_type: objectType,
                        gender: objectData.gender || null,
                        age: objectData.age || null,
                        vehicle_type: objectData.type || null,
                        vehicle_brand: objectData.brand || null,
                        vehicle_color: objectData.color || null,
                        vehicle_licence: objectData.Licence || null,
                        bbox_topleftx: objectData.bbox ? objectData.bbox.topleftx : null,
                        bbox_toplefty: objectData.bbox ? objectData.bbox.toplefty : null,
                        bbox_bottomrightx: objectData.bbox ? objectData.bbox.bottomrightx : null,
                        bbox_bottomrighty: objectData.bbox ? objectData.bbox.bottomrighty : null,
                    };
                    // Add the data object to the dataArray
                    objectArray.push(messageObject);
                });

                // Put event_list data from Json to an array
                data.event_list.forEach((event) => {
                    const eventType = Object.keys(event)[0];
                    const eventData = Object.values(event)[0];

                    const messageEvent = {
                        message_id: data.message_id,
                        object_id: eventData.object_id,
                        event_type: eventType,
                        action: eventData.action,
                    };
                    eventArray.push(messageEvent);
                });

                await Promise.all([
                    // message
                    dbconn.query(
                        `INSERT INTO message (message_id, timestamp, location_id, model_id, camera_id, number_of_objects, number_of_events, image_URL, video_URL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) AS new_message
                            ON DUPLICATE KEY UPDATE timestamp = new_message.timestamp, location_id = new_message.location_id, model_id = new_message.model_id, camera_id = new_message.camera_id,
                            number_of_objects = new_message.number_of_objects, number_of_events = new_message.number_of_events, image_URL = new_message.image_URL, video_URL = new_message.video_URL`,
                        [
                            data.message_id,
                            data.timestamp,
                            data.location.id,
                            data.model.id,
                            data.camera.id,
                            data.number_of_objects,
                            data.number_of_events,
                            data.image_URL,
                            data.video_URL,
                        ],
                    ),
                    // insert into object table
                    objectArray.forEach((objectData) => {
                        dbconn.query(`
                        INSERT INTO object SET
                            message_id = '${objectData.message_id}',
                            object_id = '${objectData.object_id}',
                            object_type = '${objectData.object_type}',
                            gender = ${objectData.gender !== null ? `'${objectData.gender}'` : null},
                            age = ${objectData.age !== null ? `'${objectData.age}'` : null},
                            vehicle_type = ${objectData.vehicle_type !== null ? `'${objectData.vehicle_type}'` : null},
                            vehicle_brand = ${
                                objectData.vehicle_brand !== null ? `'${objectData.vehicle_brand}'` : null
                            },
                            vehicle_color = ${
                                objectData.vehicle_color !== null ? `'${objectData.vehicle_color}'` : null
                            },
                            vehicle_licence = ${
                                objectData.vehicle_licence !== null ? `'${objectData.vehicle_licence}'` : null
                            },
                            bbox_topleftx = ${objectData.bbox_topleftx},
                            bbox_toplefty = ${objectData.bbox_toplefty},
                            bbox_bottomrightx = ${objectData.bbox_bottomrightx},
                            bbox_bottomrighty = ${objectData.bbox_bottomrighty}
                        AS new_object
                        ON DUPLICATE KEY UPDATE
                            object_type = new_object.object_type,
                            gender = new_object.gender,
                            age = new_object.age,
                            vehicle_type = new_object.vehicle_type,
                            vehicle_brand = new_object.vehicle_brand,
                            vehicle_color = new_object.vehicle_color,
                            vehicle_licence = new_object.vehicle_licence,
                            bbox_topleftx = new_object.bbox_topleftx,
                            bbox_toplefty = new_object.bbox_toplefty,
                            bbox_bottomrightx = new_object.bbox_bottomrightx,
                            bbox_bottomrighty = new_object.bbox_bottomrighty
                        `);
                    }),
                    // insert into event table
                    eventArray.forEach((eventData) => {
                        dbconn.query(`
                        INSERT INTO event SET
                            message_id = '${eventData.message_id}',
                            object_id = '${eventData.object_id}',
                            event_type = '${eventData.event_type}',
                            action = '${eventData.action}'
                        AS new_event
                        ON DUPLICATE KEY UPDATE
                            message_id = new_event.message_id,
                            object_id = new_event.object_id,
                            event_type = new_event.event_type,
                            action = new_event.action`);
                    }),
                ]).then(() => {
                    console.log('Data inserted successfully');
                    // Acknowledge message
                    channel.ack(msg);
                });
                const warning = await dbconn.query('SHOW WARNINGS');
                console.log(warning);
            } catch (error) {
                console.log(error);
            } finally {
                try {
                    dbconn.release();
                } catch (err) {
                    console.error(err);
                }
            }
        });
        // 6. close conn and channel
    } catch (error) {
        console.log(error);
    }
};

receiveMessage();

module.exports = receiveMessage;
