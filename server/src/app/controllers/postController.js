const Post = require('../models/Post');

class PostController {
    //route POST /@posts
    // @create post
    // access Private : phải login
    async create(req, res, next) {
        const { title, description, url, status } = req.body;
        try {
            const newPost = new Post({
                title,
                description,
                url,
                status: status || 'TO LEARN',
                user: req.userId, // Lấy từ middleware auth,
            });
            await newPost.save();
            res.json({ succes: true, message: 'Tạo bài viết thành công', post: newPost });
        } catch (error) {
            res.status(550).json({ success: false, message: 'Lỗi server' });
        }
    }

    //route GET /@posts
    // @get post
    // access Private : phải login
    async getAll(req, res, next) {
        try {
            const posts = await Post.find({ user: req.userId }).populate('user', ['username']); // Lấy thêm dữ liệu bảng user cho vào ( chỉ cho thêm uername)
            res.json({ succes: true, message: `Api userId ${req.userId}`, posts: posts });
        } catch (error) {
            res.status(550).json({ success: false, message: 'Lỗi server' });
        }
    }

    //route PUT /@posts
    // @put post
    // access Private : phải login
    async update(req, res, next) {
        const { title, description: description, url, status } = req.body;

        try {
            let updatedPost = {
                title,
                description: description || '',
                url,
                status: status || 'TO LEARN',
                user: req.userId, // Lấy từ middleware auth,
            };
            updatedPost = await Post.findOneAndUpdate({ _id: req.params.id, user: req.userId }, updatedPost, {
                new: true,
            }); //{new:true} để tar về cái mới update còn ko có nó sẽ tar về cái cũ
            if (!updatedPost) {
                res.status(404).json({ succes: false, message: 'Không update được bài viết' });
            } else {
                res.json({ succes: true, message: 'Update bài viết thành công', post: updatedPost });
            }
        } catch (error) {
            res.status(550).json({ success: false, message: 'Lỗi server' });
        }
    }

    //route delete /@posts
    // @get delete
    // access Private : phải login
    async delete(req, res, next) {
        try {
            const deletedPost = await Post.findOneAndDelete({ _id: req.params.id, user: req.userId });
            if (!deletedPost) {
                res.status(404).json({ succes: false, message: 'Không xóa được bài viết' });
            } else {
                res.json({ succes: true, message: 'Xóa bài viết thành công', post: deletedPost });
            }
        } catch (error) {
            res.status(550).json({ success: false, message: 'Lỗi server' });
        }
    }
}

module.exports = new PostController();
