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
            console.log('call API to /filter');
            console.log(req.query);
            // console.log(typeof req.query.status);
            let myQuery = `SELECT DISTINCT *, 
                            model.description AS model_description, 
                            camera.description AS camera_description 
                            FROM message 
                            INNER JOIN model ON message.model_id = model.model_id 
                            INNER JOIN camera ON message.camera_id = camera.camera_id 
                            WHERE 1=1`;
            const queryParams = [];

            if (req.query.eventType && req.query.eventType !== 'all') {
                myQuery += ` AND EXISTS (SELECT * FROM event WHERE event.message_id = message.message_id AND event_type = ?)`;
                queryParams.push(req.query.eventType);
            }

            if (req.query.timeFrom) {
                const timeFrom = new Date(req.query.timeFrom).toISOString();
                console.log('timeFrom: ', timeFrom);
                myQuery += ` AND message.timestamp >= ?`;
                queryParams.push(timeFrom);
            }

            if (req.query.timeTo) {
                const timeTo = new Date(req.query.timeTo).toISOString();
                console.log('timeTo: ', timeTo);
                myQuery += ` AND message.timestamp <= ?`;
                queryParams.push(timeTo);
            }

            if (req.query.cameraID && req.query.cameraID !== 'all') {
                myQuery += ` AND message.camera_id = ?`;
                queryParams.push(req.query.cameraID);
            }

            if (req.query.status && req.query.status !== 'all') {
                let status;
                if (req.query.status === 'null') {
                    myQuery += ` AND status IS NULL`;
                } else {
                    status = parseInt(req.query.status, 10);
                    if (status === 0 || status === 1) {
                        myQuery += ' AND message.status = ?';
                        queryParams.push(status);
                    }
                }
            }
            // console.log(myQuery);
            const result = await conn.query(myQuery, queryParams);
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
