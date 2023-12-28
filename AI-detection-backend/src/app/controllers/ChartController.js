const path = require('path');
const gcs = require('../../utils/Storage');
const getConnect = require('../../utils/Database');
const { error } = require('console');

class ChartController {
    // GET /
    async index(req, res, next) {
        const conn = await getConnect();
        try {
            console.log('call API to /chart');
            const result =
                await conn.query(`SELECT DISTINCT *, model.description AS model_description, camera.description AS camera_description 
                                            FROM message                                
                                            JOIN model ON message.model_id = model.model_id
                                            JOIN camera ON message.camera_id = camera.camera_id`);
            const data = result[0].map((row) => ({
                messageId: row.message_id,
                timestamp: row.timestamp,
                locationId: row.location_id,
                modelId: row.model_id,
                cameraId: row.camera_id,
                numberOfObjects: row.number_of_objects,
                numberOfEvents: row.number_of_events,
                status: row.status,
                imageURL: row.image_URL,
                videoURL: row.video_URL,
                modelDescription: row.model_description,
                cameraType: row.type,
                cameraDescription: row.camera_description,
            }));
            // Convert JSON object to string
            const jsonString = JSON.stringify(data);
            // console.log(jsonString);
            res.send(jsonString);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal Server Error' });
        } finally {
            try {
                // await pool.end();
                conn.release();
            } catch (err) {
                console.error(err);
            }
        }
    }
    async filter(req, res, next) {
        const conn = await getConnect();
        try {
            console.log('call API to /chart/filter');
            console.log(req.query);
            let myQuery = 'SELECT * FROM message WHERE 1=1';
            const queryParams = [];

            if (req.query.objectType) {
                myQuery += ' AND object_id = ?';
                queryParams.push(req.query.objectType);
            }

            if (req.query.timeFrom) {
                const timeFrom = new Date(req.query.timeFrom).toISOString();
                console.log('timeFrom: ', timeFrom);
                myQuery += ' AND timestamp >= ?';
                queryParams.push(timeFrom);
            }

            if (req.query.timeTo) {
                const timeTo = new Date(req.query.timeTo).toISOString();
                console.log('timeTo: ', timeTo);
                myQuery += ' AND timestamp <= ?';
                queryParams.push(timeTo);
            }

            if (req.query.sensorID) {
                const sensorID = parseInt(req.query.sensorID, 10);
                myQuery += ' AND sensor_id = ?';
                queryParams.push(sensorID);
            }
            // console.log(myQuery);
            const result = await conn.query(myQuery, queryParams);
            const data = result[0].map((row) => ({
                messageid: row.messageid,
                timestamp: row.timestamp,
                place_id: row.place_id,
                sensor_id: row.sensor_id,
                object_id: row.object_id,
                event_id: row.event_id,
                imageURL: row.imageURL,
                videoURL: row.videoURL,
                status: row.status,
            }));
            // console.log(data);
            // Convert JSON object to string
            const jsonString = JSON.stringify(data);
            // console.log(jsonString);
            res.send(jsonString);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal Server Error' });
        } finally {
            try {
                await conn.release();
            } catch (err) {
                console.error(err);
            }
        }
    }
}
module.exports = new ChartController();
