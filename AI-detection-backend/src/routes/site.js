var express = require('express');
var router = express.Router();

// const { gcs } = require('../index');

const siteController = require('../app/controllers/SiteController');

// router.get('/', siteController.realtimeRender);
router.get('/', siteController.realtimeRender);
router.get('/event', siteController.getEventInfo);
router.get('/filter', siteController.filter);
router.put('/accept', siteController.accept);
router.put('/reject', siteController.reject);
router.put('/discard-ack', siteController.discardAck);

module.exports = router;
