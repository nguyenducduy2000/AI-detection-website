const path = require('path');
const { Storage } = require('@google-cloud/storage');
require('dotenv').config({ path: path.join(__dirname, '../../../.env') });

const env = {
    keyFilename: process.env.KEY_FILE_NAME,
    projectId: process.env.PROJECT_ID,
};

const gcs = new Storage({ ...env });

module.exports = gcs;
