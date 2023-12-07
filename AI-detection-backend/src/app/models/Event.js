const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const slug = require('mongoose-slug-updater');
const MongooseDelete = require('mongoose-delete');

const Event = new Schema({
    messageid: { type: String },
    '@timestamp': { type: datetime },
    place: {
        id: { type: integer, required: true },
        name: { type: String },
        type: { type: String },
        location: {
            lat: { type: float32 },
            lon: { type: float32 },
            alt: { type: float32 },
        },
    },
    sensor: {
        id: { type: integer },
        type: { type: String },
        description: { type: String },
        location: {
            lat: { type: float32 },
            lon: { type: float32 },
            alt: { type: float32 },
        },
    },
    object: {
        id: { type: String },
        bbox: {
            topleftx: { type: integer },
            toplefty: { type: integer },
            bottomrightx: { type: integer },
            bottomrighty: { type: integer },
        },
        location: {
            lat: { type: float32 },
            lon: { type: float32 },
            alt: { type: float32 },
        },
    },
    event: {
        id: { type: String },
        type: { type: String },
    },
    imageURL: { type: String },
    videoURL: { type: String },
});

module.exports = mongoose.model('Event', Event);
