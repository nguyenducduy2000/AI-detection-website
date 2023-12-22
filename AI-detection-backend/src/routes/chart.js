var express = require('express');
var router = express.Router();

// const { gcs } = require('../index');

const ChartController = require('../app/controllers/ChartController');

router.get('/', ChartController.index);
router.get('/filter', ChartController.filter);

module.exports = router;
