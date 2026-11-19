const mongoose = require("mongoose");

const answearShema = new mongoose.Schema({
    bruker : mongoose.Schema.Types.ObjectId,
    luke : Number,
    svar : String
})
module.exports = mongoose.model("Answear", answearShema);