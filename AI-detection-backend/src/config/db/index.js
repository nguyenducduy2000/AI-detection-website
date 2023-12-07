// Add package
const mongoose = require('mongoose');

// method async
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/F8_education_dev');
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
