const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const verifyToken = require('../middleware/auth');

//route POST /@posts
// @create post
// access Private : phải login
router.post('/', verifyToken, postController.create);

//route GET /@posts
// @get post
// access Private : phải login
router.get('/', verifyToken, postController.get);

//route PUT /@posts
// @get put
// access Private : phải login
router.put('/:id', verifyToken, postController.update);

//route delete /@posts
// @get delete
// access Private : phải login
router.delete('/:id', verifyToken, postController.delete);

module.exports = router;
