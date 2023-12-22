const siteRouter = require('./site');
const chartRouter = require('./chart');

function route(app) {
    app.use('/', siteRouter);
    app.use('/chart', chartRouter);
}

module.exports = route;
