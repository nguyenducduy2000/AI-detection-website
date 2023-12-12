const path = require('path');
const gcs = require('../../utils/Storage');
const getConnect = require('../../utils/Database');
const { error } = require('console');

class SiteController {
    // GET /
    async index(req, res, next) {
        const conn = await getConnect();
        try {
            const result = await conn.query(`SELECT * FROM message;`);
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

    // PUT /accept
    async accept(req, res, next) {
        const conn = await getConnect();
        try {
            console.log(req.body.id);
            const result = await conn.query(`UPDATE message SET status = 1 WHERE messageid = ?`, [req.body.id]);
            // const data = result[0].map((row) => ({
            //     messageid: row.messageid,
            //     timestamp: row.timestamp,
            //     place_id: row.place_id,
            //     sensor_id: row.sensor_id,
            //     object_id: row.object_id,
            //     event_id: row.event_id,
            //     imageURL: row.imageURL,
            //     videoURL: row.videoURL,
            //     status: row.status,
            // }));
            // console.log(data);
            res.redirect('back');
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

    // PUT /reject
    async reject(req, res, next) {
        const conn = await getConnect();
        try {
            const result = await conn.query(`UPDATE message SET status = 0 WHERE messageid = ?`, [req.body.id]);
            // const data = result[0].map((row) => ({
            //     messageid: row.messageid,
            //     timestamp: row.timestamp,
            //     place_id: row.place_id,
            //     sensor_id: row.sensor_id,
            //     object_id: row.object_id,
            //     event_id: row.event_id,
            //     imageURL: row.imageURL,
            //     videoURL: row.videoURL,
            //     status: row.status,
            // }));
            // console.log(data);
            res.redirect('back');
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
}

module.exports = new SiteController();
