const authRouter = require('./auth');
const postRouter = require('./post');

function route(app) {
    app.use('/auth', authRouter);
    app.use('/posts', postRouter);
    app.use('/', (req, res, next) => {
        res.send('server này có chạy nhá-2');
    });
}

module.exports = route;
