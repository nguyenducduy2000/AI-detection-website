const path = require('path');
const gcs = require('../../utils/Storage');
const getConnect = require('../../utils/Database');
const { error } = require('console');

class SiteController {
    // GET /
    async index(req, res, next) {
        const conn = await getConnect();
        try {
            console.log('call API to /');
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
            // const jsonString = JSON.stringify(data);
            // console.log(jsonString);
            res.send(data);
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

    // GET /
    async realtimeRender(req, res, next) {
        const conn = await getConnect();
        try {
            console.log('call API to get 5 minutes ago events');

            // Get the timestamp of 5 minutes ago
            const fiveMinutesAgo = new Date();
            fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);

            const result = await conn.query(
                `SELECT DISTINCT *, model.description AS model_description, camera.description AS camera_description 
                FROM message                                
                INNER JOIN model ON message.model_id = model.model_id
                INNER JOIN camera ON message.camera_id = camera.camera_id 
                WHERE timestamp >= ?`,
                [fiveMinutesAgo],
            );
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
            const jsonString = JSON.stringify(data);
            res.send(jsonString);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Internal Server Error' });
        } finally {
            try {
                conn.release();
            } catch (err) {
                console.error(err);
            }
        }
    }

    // GET /event
    async getEventInfo(req, res, next) {
        const conn = await getConnect();
        try {
            console.log('call API to /event');
            console.log(req.query);
            const result = await conn.query(
                `
                SELECT *
                FROM object
                INNER JOIN event ON object.message_id = event.message_id
                WHERE object.message_id = ?`,
                [req.query.messageId],
            );
            const data = result[0].map((row) => ({
                messageId: row.message_id,
                objectID: row.object_id,
                objectType: row.object_type,
                gender: row.gender || null,
                age: row.age || null,
                vehicleType: row.vehicle_type || null,
                vehicleBrand: row.vehicle_brand || null,
                vehicleColor: row.vehicle_color || null,
                vehicleLicence: row.vehicle_licence || null,
                bbox_topleftx: row.bbox_topleftx,
                bbox_toplefty: row.bbox_toplefty,
                bbox_bottomrightx: row.bbox_bottomrightx,
                bbox_bottomrighty: row.bbox_bottomrighty,
                eventType: row.event_type,
                action: row.action,
            }));
            // Convert JSON object to string
            const jsonString = JSON.stringify(data);
            // console.log(jsonString);
            res.send(jsonString);
        } catch (err) {
            console.log(err);
        } finally {
            try {
                conn.release();
            } catch (err) {
                console.error(err);
            }
        }
    }

    // GET /filter
    async filter(req, res, next) {
        const conn = await getConnect();
        try {
            console.log('call API to /filter');
            console.log(req.query);
            // console.log(typeof req.query.status);
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

            if (req.query.status && req.query.status !== 'all') {
                let status;
                if (req.query.status === 'null') {
                    myQuery += ' AND status IS NULL';
                } else {
                    status = parseInt(req.query.status, 10);
                    if (status === 0 || status === 1) {
                        myQuery += ' AND status = ?';
                        queryParams.push(status);
                    }
                }
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

    // PUT /accept
    async accept(req, res, next) {
        const conn = await getConnect();
        try {
            const result = await conn.query(`UPDATE message SET status = 1 WHERE messageid = ?`, [req.body.id]);
            res.send({ success: true });
        } catch (err) {
            console.error(err);
            res.status(400).send({ error: 'Error updating message status' });
        } finally {
            try {
                await conn.release();
            } catch (err) {
                console.error(err);
            }
        }
    }

    // PUT /reject
    async reject(req, res, next) {
        const conn = await getConnect();
        try {
            const result = await conn.query(`UPDATE message SET status = 0 WHERE messageid = ?`, [req.body.id]);
            res.send({ success: true });
        } catch (err) {
            console.error(err);
            res.status(400).send({ error: 'Error updating message status' });
        } finally {
            try {
                await conn.release();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

module.exports = new SiteController();
