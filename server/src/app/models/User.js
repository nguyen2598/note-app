const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const slug = require('mongoose-slug-updater');
// mongoose.plugin(slug);

const UserSchema = new Schema(
    {
        email: { type: String, maxLength: 255, unique: true },
        username: { type: String, maxLength: 255, unique: true },
        password: { type: String, maxLength: 600 },
        role: { type: String, maxLength: 255, default: '1' },

        // createdAt: { type: Date, default: Date.now },
        // updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true, unique: true },
);

module.exports = mongoose.model('user', UserSchema);
