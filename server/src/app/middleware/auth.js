// Để chặn request  nếu đíu có token (nghĩa là đíu đăng nhập thì cút đăng bài bằng niềm tin nhé)

const jwt = require('jsonwebtoken');
// Dạng của Authorization :bearer dsbhnsalkdsjkdskksdks
const veryfyToken = (req, res, next) => {
    const authheader = req.header('Authorization');
    const token = authheader && authheader.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'Không có token mà muốn đi tiếp á 🤔' });

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decodedToken);
        req.userId = decodedToken.userid;
        next();
    } catch (err) {
        res.status(403).json({ success: false, message: 'Token mày là hàng lởm à 🤡' });
    }
};
module.exports = veryfyToken;
