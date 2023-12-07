const path = require('path');
const mysql = require('mysql2/promise');
const { Connector } = require('@google-cloud/cloud-sql-connector');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

// In case the PRIVATE_IP environment variable is defined then we set
// the ipType=PRIVATE for the new connector instance, otherwise defaults
// to public ip type.
const getIpType = () => (process.env.PRIVATE_IP === '1' || process.env.PRIVATE_IP === 'true' ? 'PRIVATE' : 'PUBLIC');

// connectWithConnector initializes a connection pool for a Cloud SQL instance
// of MySQL using the Cloud SQL Node.js Connector.
const connectWithConnector = async (config) => {
    // Note: Saving credentials in environment variables is convenient, but not
    // secure - consider a more secure solution such as
    // Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
    // keep secrets safe.
    const connector = new Connector();
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

const getConnect = async () => {
    const pool = await connectWithConnector();

    return await pool.getConnection();
};

// const test = async () => {
//     const conn = await getConnect();
//     try {
//         const result = await conn.query(`SELECT * FROM demoEvent;`);
//         console.log(result);
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
