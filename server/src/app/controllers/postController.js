const Post = require('../models/Post');
const PAGE_SIZE = 8;
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
                url: !url.startsWith('https://') ? 'https://' + url : url,
                status: status || 'LEARNING',
                user: req.userId, // Lấy từ middleware auth,
            });
            await newPost.save();
            res.json({ success: true, message: 'Tạo bài viết thành công', post: newPost });
        } catch (error) {
            res.status(550).json({ success: false, message: 'Lỗi server' });
        }
    }

    //route GET /@posts
    // @get post
    // access Private : phải login
    async get(req, res, next) {
        try {
            let page = req.query.page;
            let limit = req.query.limit;
            let totalPost = await Post.countDocuments({});
            if (page && limit) {
                limit = parseInt(limit) > 0 ? parseInt(limit) : PAGE_SIZE;
                let totalPage = Math.ceil(totalPost / parseInt(limit));
                page = parseInt(page) <= 0 ? 1 : parseInt(page) > totalPage ? totalPage : parseInt(page);
                const nextNumber = (page - 1) * limit;
                const posts = await Post.find({ user: req.userId })
                    .populate('user', ['username']) // Lấy thêm dữ liệu bảng user cho vào ( chỉ cho thêm uername)
                    .skip(nextNumber) // hàm này có sẵn trong mongose dùng để bỏ qua so ptu
                    .limit(limit);
                res.json({ success: true, message: `Api userId ${req.userId}`, totalPage, posts: posts });
            } else if (page) {
                let totalPage = Math.ceil(totalPost / parseInt(PAGE_SIZE));
                page = parseInt(page) > 0 ? parseInt(page) : 1;
                const nextNumber = (page - 1) * PAGE_SIZE;
                const posts = await Post.find({ user: req.userId })
                    .populate('user', ['username']) // Lấy thêm dữ liệu bảng user cho vào ( chỉ cho thêm uername)
                    .skip(nextNumber) // hàm này có sẵn trong mongose dùng để bỏ qua so ptu
                    .limit(PAGE_SIZE);
                res.json({ success: true, message: `Api userId ${req.userId}`, totalPage, posts: posts });
            } else {
                const posts = await Post.find({ user: req.userId }).populate('user', ['username']); // Lấy thêm dữ liệu bảng user cho vào ( chỉ cho thêm uername)
                res.json({ success: true, message: `Api userId ${req.userId}`, totalPost, posts: posts });
            }
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
                res.status(404).json({ success: false, message: 'Không update được bài viết' });
            } else {
                res.json({ success: true, message: 'Update bài viết thành công', post: updatedPost });
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
                res.status(404).json({ success: false, message: 'Không xóa được bài viết' });
            } else {
                res.json({ success: true, message: 'Xóa bài viết thành công', post: deletedPost });
            }
        } catch (error) {
            res.status(550).json({ success: false, message: 'Lỗi server' });
        }
    }
}

module.exports = new PostController();
