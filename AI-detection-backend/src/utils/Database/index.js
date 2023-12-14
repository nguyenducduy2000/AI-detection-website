const path = require('path');
const mysql = require('mysql2/promise');
const { Connector } = require('@google-cloud/cloud-sql-connector');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

const getRandomDate = require('../getRandomDate');

// In case the PRIVATE_IP environment variable is defined then we set
// the ipType=PRIVATE for the new connector instance, otherwise defaults
// to public ip type.
const getIpType = () => (process.env.PRIVATE_IP === '1' || process.env.PRIVATE_IP === 'true' ? 'PRIVATE' : 'PUBLIC');

// connectWithConnector initializes a connection pool for a Cloud SQL instance
// of MySQL using the Cloud SQL Node.js Connector.
const connector = new Connector();

const connectWithConnector = async (config) => {
    // Note: Saving credentials in environment variables is convenient, but not
    // secure - consider a more secure solution such as
    // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
    // keep secrets safe.
    const clientOpts = await connector.getOptions({
        instanceConnectionName: process.env.INSTANCE_CONNECTION_NAME,
        ipType: getIpType(),
    });
    const dbConfig = {
        ...clientOpts,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        // ... Specify additional properties here.
        ...config,
    };
    // Establish a connection to the database and create a pool.
    return mysql.createPool(dbConfig);
};

let pool;

const getConnect = async () => {
    if (!pool) {
        pool = await connectWithConnector();
    }
    return await pool.getConnection();
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// const test = async () => {
//     const conn = await getConnect();
//     try {
//         for (let i = 1; i <= 26; i++) {
//             // Generate random values for message table
//             const messageId = `message_${i}`;
//             const timestamp = getRandomDate();
//             const placeId = i;
//             const sensorId = getRandomInt(1, 3);
//             const objectId = `type_${getRandomInt(1, 3)}`;
//             const eventId = `event_${i}`;
//             const imageURL = `https://storage.googleapis.com/web-backend-test/images/img_${i}.jpg`;
//             const videoURL = `https://storage.googleapis.com/web-backend-test/videos/video_${i}.mp4`;

//             // Generate random values for place table
//             const placeIdChild = placeId;
//             const placeName = `Place ${i}`;
//             const placeType = 'Type 1';
//             const locationIdPlace = i;

//             // Generate random values for place_location table
//             const locationIdPlaceLocation = locationIdPlace;
//             const latPlaceLocation = 37.12345;
//             const lonPlaceLocation = -122.6789;
//             const altPlaceLocation = 0.0;

//             // Generate random values for sensor table
//             const sensorIdChild = sensorId;
//             const sensorType = 'Type 2';
//             const sensorDescription = 'Description 2';
//             const locationIdSensor = i;

//             // Generate random values for sensor_location table
//             const locationIdSensorLocation = locationIdSensor;
//             const latSensorLocation = 37.54321;
//             const lonSensorLocation = -122.9876;
//             const altSensorLocation = 10.0;

//             // Generate random values for object table
//             const objectIdChild = objectId;
//             const bboxId = i;
//             const locationIdObject = i;

//             // Generate random values for object_bbox table
//             const bboxIdChild = bboxId;
//             const topleftx = 10;
//             const toplefty = 20;
//             const bottomrightx = 30;
//             const bottomrighty = 40;

//             // Generate random values for object_location table
//             const locationIdObjectLocation = locationIdObject;
//             const latObjectLocation = 37.98765;
//             const lonObjectLocation = -122.1234;
//             const altObjectLocation = 5.0;

//             // Generate random values for event table
//             const eventIdChild = eventId;
//             const eventType = `type ${i}`;

//             // insert values to database
//             await Promise.all([
//                 // message
//                 conn.query(
//                     'INSERT INTO message (messageid, timestamp, place_id, sensor_id, object_id, event_id, imageURL, videoURL) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
//                     [messageId, timestamp, placeId, sensorId, objectId, eventId, imageURL, videoURL],
//                 ),
//                 // plade_location
//                 conn.query('INSERT INTO place_location (id, lat, lon, alt) VALUES (?, ?, ?, ?)', [
//                     locationIdPlaceLocation,
//                     latPlaceLocation,
//                     lonPlaceLocation,
//                     altPlaceLocation,
//                 ]),
//                 // object_bbox
//                 conn.query(
//                     'INSERT INTO object_bbox (id, topleftx, toplefty, bottomrightx, bottomrighty) VALUES (?, ?, ?, ?, ?)',
//                     [bboxIdChild, topleftx, toplefty, bottomrightx, bottomrighty],
//                 ),
//                 // sensor_location
//                 conn.query('INSERT INTO sensor_location (id, lat, lon, alt) VALUES (?, ?, ?, ?)', [
//                     locationIdSensorLocation,
//                     latSensorLocation,
//                     lonSensorLocation,
//                     altSensorLocation,
//                 ]),
//                 // object_location
//                 conn.query('INSERT INTO object_location (id, lat, lon, alt) VALUES (?, ?, ?, ?)', [
//                     locationIdObjectLocation,
//                     latObjectLocation,
//                     lonObjectLocation,
//                     altObjectLocation,
//                 ]),
//                 // place
//                 conn.query('INSERT INTO place (id, name, type, location_id, message_id) VALUES (?, ?, ?, ?, ?)', [
//                     placeIdChild,
//                     placeName,
//                     placeType,
//                     locationIdPlace,
//                     messageId,
//                 ]),
//                 // sensor
//                 conn.query(
//                     'INSERT INTO sensor (id, type, description, location_id, message_id) VALUES (?, ?, ?, ?, ?)',
//                     [sensorIdChild, sensorType, sensorDescription, locationIdSensor, messageId],
//                 ),
//                 // object
//                 conn.query('INSERT INTO object (id, bbox_id, location_id, message_id) VALUES (?, ?, ?, ?)', [
//                     objectIdChild,
//                     bboxId,
//                     locationIdObject,
//                     messageId,
//                 ]),
//                 // event
//                 conn.query('INSERT INTO event (id, type, message_id) VALUES (?, ?, ?)', [
//                     eventIdChild,
//                     eventType,
//                     messageId,
//                 ]),
//             ]);
//         }
//         console.log('Data inserted successfully');
//     } catch (err) {
//         console.error(err);
//     } finally {
//         try {
//             // await pool.end();
//             conn.release();
//         } catch (err) {
//             console.error(err);
//         }
//     }
// };
// test();

module.exports = getConnect;
