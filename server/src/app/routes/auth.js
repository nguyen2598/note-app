const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const verifyToken = require('../middleware/auth');

// Check  xem users login chuwa
// Access  public
router.get('/', verifyToken, authController.checkUser);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
