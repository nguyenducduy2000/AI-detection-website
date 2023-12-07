const path = require('path');
const gcs = require('../../utils/Storage');
const getConnect = require('../../utils/Database');
const { error } = require('console');

class SiteController {
    // GET /
    async index(req, res, next) {
        const conn = await getConnect();
        try {
            const result = await conn.query(`SELECT * FROM demoEvent;`);
            const data = result[0].map((row) => ({
                id: row.id,
                timestamp: row.timestamp,
                title: row.title,
                imageURL: row.imageURL,
                videoURL: row.videoURL,
            }));
            console.log(data);
            res.send(data);
        } catch (err) {
            console.error(err);
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
