const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.URL_DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
        });
        console.log('database succcessfully');
    } catch (error) {}
}

module.exports = { connect };
