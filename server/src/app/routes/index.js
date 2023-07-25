const authRouter = require('./auth');
const postRouter = require('./post');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/posts', postRouter);
}

module.exports = route;
