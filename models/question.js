const mongoose = require("mongoose");

const questionShema = new mongoose.Schema({
    id : Number, //the door number 
    type : String, // multiple choice, question or video 
    question: String, // the qestion text
    options:[String], // a listy of possible answears
    correct_answer:String, // Riktig svar lagres på serveren.
    video_url: String  // a video link, when needed
})

module.exports = mongoose.model("Question", questionShema);
