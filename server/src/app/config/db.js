const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://devblog:devblog@cluster0.qriwtnt.mongodb.net/Devblog?retryWrites=true&w=majority' /*process.env.URL_DATABASE */,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // useCreateIndex: true,
            },
        );
        console.log('database succcessfully');
    } catch (error) {}
}

module.exports = { connect };
