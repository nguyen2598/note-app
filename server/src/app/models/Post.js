const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const slug = require('mongoose-slug-updater');
// mongoose.plugin(slug);

const PostSchema = new Schema(
    {
        title: { type: String, maxLength: 255 },
        description: { type: String, maxLength: 255 },
        url: { type: String, maxLength: 600 },
        status: {
            type: String,
            enum: ['TO LEARN', 'LEARNING', 'LEARNED'],
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
        },

        // createdAt: { type: Date, default: Date.now },
        // updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true, unique: true },
);

module.exports = mongoose.model('post', PostSchema);
