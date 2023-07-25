const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(
            'mongodb+srv://noteapp:noteapp@cluster0.2hmljmw.mongodb.net/note?retryWrites=true&w=majority',
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
