const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        require: true,
    },
    lastName:{
        type: String,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    jobTitle:{
        type: String,
    },
    gender:{
        type: String,
    },
}, {timestamps: true});

const User = mongoose.model("user", userSchema);

module.exports = User;