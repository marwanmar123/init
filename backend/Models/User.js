const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, require: true, trim: true },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: { type: String, require: true },
});

module.exports = mongoose.model("User", userSchema)