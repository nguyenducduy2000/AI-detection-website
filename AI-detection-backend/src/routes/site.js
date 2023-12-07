var express = require('express');
var router = express.Router();

// const { gcs } = require('../index');

const siteController = require('../app/controllers/SiteController');

router.get('/', siteController.index);

module.exports = router;
