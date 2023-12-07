const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const cors = require('cors');
const bodyParser = require('body-parser');
const gcs = require('./utils/Storage');
const getConnect = require('./utils/Database');

const app = express();
const port = 4000;

const route = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOption = {
    origon: '*',
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOption));

app.use(methodOverride('_method'));

app.use(morgan('combined'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
