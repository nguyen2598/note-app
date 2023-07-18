const User = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'dinhnguyen250802@gmail.com',
//         pass: 'your-email-password',
//     },
// });

// // Gửi email xác nhận
// function sendVerificationEmail(email, code) {
//     const mailOptions = {
//         from: 'dinhnguyen250802@gmail.com',
//         to: email,
//         subject: 'Xác nhận tài khoản',
//         text: `Mã xác nhận của bạn là: ${code}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email xác nhận đã được gửi: ' + info.response);
//         }
//     });
// }

// // Tạo mã xác nhận ngẫu nhiên
// function generateVerificationCode() {
//     // Logic để tạo mã xác nhận ở đây
// }
class AuthController {
    async register(req, res, next) {
        const { username, password, email } = req.body;
        try {
            const user = await User.findOne({ $or: [{ email: email }, { username: username }] });

            if (user) {
                res.status(550).json({ message: 'Tài khoản đã tồn tại' });
            } else {
                const hashedPassword = await argon2.hash(password);
                const newUser = new User({ username, password: hashedPassword, email });
                await newUser.save();
                const accsessToken = jwt.sign({ userid: newUser._id }, process.env.ACCESS_TOKEN_SECRET);
                res.json({ success: true, token: accsessToken, message: 'tạo thành công' });
            }
        } catch (error) {
            res.status(550).json({ success: false, message: 'Lỗi server' });
        }
    }

    async login(req, res, next) {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                res.status(400).json({ success: false, message: 'Tài khoản không tồn tại' });
            } else {
                // Kiểm tra xem đúng mật khẩu không
                const passwordValid = await argon2.verify(user.password, password);
                if (!passwordValid) {
                    res.status(400).json({ success: false, message: 'Sai mật khẩu' });
                } else {
                    const accsessToken = jwt.sign({ userid: user._id }, process.env.ACCESS_TOKEN_SECRET);
                    res.json({ success: true, token: accsessToken, message: 'Đăng nhập thành công' });
                }
            }
        } catch (error) {
            res.status(550).json({ success: false, message: 'Lỗi server' });
        }
    }
}
module.exports = new AuthController();
