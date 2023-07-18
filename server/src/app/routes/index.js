const authRouter = require('./auth');
const postRouter = require('./post');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/post', postRouter);
}

module.exports = route;
