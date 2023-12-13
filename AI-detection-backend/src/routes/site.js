var express = require('express');
var router = express.Router();

// const { gcs } = require('../index');

const siteController = require('../app/controllers/SiteController');

router.get('/', siteController.index);
router.get('/filter', siteController.filter);
router.put('/accept', siteController.accept);
router.put('/reject', siteController.reject);

module.exports = router;
