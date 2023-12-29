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
        const nameQueue = 'q1';

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
                const data = await JSON.parse(msg.content.toString());
                // console.log('Msg::::', data);
                // channel.ack(msg);

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
                        'INSERT INTO message (message_id, timestamp, location_id, model_id, camera_id, number_of_objects, number_of_events, image_URL, video_URL) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
                        [
                            data.message_id,
                            data.timestamp,
                            data.location_id,
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
                        dbconn.query('INSERT INTO object SET ?', objectData);
                    }),
                    // insert into event table
                    eventArray.forEach((eventData) => {
                        dbconn.query('INSERT INTO event SET ?', eventData);
                    }),
                ]).then(() => {
                    console.log('Data inserted successfully');
                });
                // Acknowledge message
                await channel.ack(msg);
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

module.exports = receiveMessage;
