const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mern-app', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('connect suss');
    } catch (error) {
        console.log('conect falls');
    }
}

module.exports = { connect };
