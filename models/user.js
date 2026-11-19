const mongoose = require("mongoose");

// Each participant has a name and an email address.
const userSchema = new mongoose.Schema({
    navn: String,
    email: String,
    rolle: {
        type: String,
        enum: ["student", "admin"],
        default: "student"
    }
});

module.exports = mongoose.model("User", userSchema);
