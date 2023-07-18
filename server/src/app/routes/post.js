const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');
const veridyToken = require('../middleware/auth');

//route POST /@posts
// @create post
// access Private : phải login
router.post('/', veridyToken, postController.create);

//route GET /@posts
// @get post
// access Private : phải login
router.get('/', veridyToken, postController.getAll);

//route PUT /@posts
// @get put
// access Private : phải login
router.put('/:id', veridyToken, postController.update);

//route delete /@posts
// @get delete
// access Private : phải login
router.delete('/:id', veridyToken, postController.delete);

module.exports = router;
