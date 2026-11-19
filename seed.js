const mongoose = require("mongoose");
require("dotenv").config();

// 24 egne spørsmål. Hvert spørsmål er skrevet inn manuelt.
const questions = [
    {
        id: 1,
        type: "open",
        question: "Hva er 6 + 6 hvis du teller julegaver?",
        correct_answer: "12"
    },
    {
        id: 2,
        type: "open",
        question: "Hvilken måned kommer rett før desember?",
        correct_answer: "November"
    },
    {
        id: 3,
        type: "open",
        question: "Hva heter vann når det har frosset til fast form?",
        correct_answer: "Is"
    },
    {
        id: 4,
        type: "open",
        question: "Hvilken farge får du når du blander rødt og hvitt?",
        correct_answer: "Rosa"
    },
    {
    id: 5,
    type: "video",
    question: "Se videoen og svar: Hvilken juleklassiker er dette?",
    video_url: "https://www.youtube.com/watch?v=E8gmARGvPlI",
    correct_answer: "Wham!"
},
    {
        id: 6,
        type: "open",
        question: "Hva heter hovedstaden i Sverige?",
        correct_answer: "Stockholm"
    },
    {
        id: 7,
        type: "open",
        question: "Hva er det engelske ordet for snø?",
        correct_answer: "Snow"
    },
    {
        id: 8,
        type: "video",
        question: "Se videoen og svar: Hva heter sangen?",
        video_url: "https://www.youtube.com/watch?v=aAkMkVFwAoo",
        correct_answer: "All I Want for Christmas Is You"
    },
    {
        id: 9,
        type: "open",
        question: "Du pakker 3 gaver til hver av 4 venner. Hvor mange gaver pakker du?",
        correct_answer: "12"
    },
    {
        id: 10,
        type: "open",
        question: "Hva heter hovedstaden i Danmark?",
        correct_answer: "København"
    },
    {
        id: 11,
        type: "open",
        question: "Hvilket ord mangler: God jul og godt nytt ...?",
        correct_answer: "År"
    },
    {
        id: 12,
        type: "open",
        question: "Hvor mange minutter er det i en halvtime?",
        correct_answer: "30"
    },
    {
        id: 13,
        type: "open",
        question: "Du deler 20 klementiner likt mellom 5 personer. Hvor mange får hver?",
        correct_answer: "4"
    },
    {
        id: 14,
        type: "open",
        question: "Hvilken verdensdel ligger Norge i?",
        correct_answer: "Europa"
    },
    {
        id: 15,
        type: "open",
        question: "Hvilken måned begynner året med?",
        correct_answer: "Januar"
    },
    {
        id: 16,
        type: "open",
        question: "Hvor mange sider har en trekant?",
        correct_answer: "3"
    },
    {
        id: 17,
        type: "open",
        question: "En julefilm starter klokken 18 og varer i to timer. Hvilket klokkeslett slutter den?",
        correct_answer: "20:00"
    },
    {
        id: 18,
        type: "open",
        question: "Hvilken planet bor vi på?",
        correct_answer: "Jorden"
    },
    {
        id: 19,
        type: "open",
        question: "Hva er det engelske ordet for gave?",
        correct_answer: "Gift"
    },
    {
        id: 20,
        type: "open",
        question: "En gave koster 80 kroner. Du betaler med 100 kroner. Hvor mye får du tilbake?",
        correct_answer: "20 kroner"
    },
    {
        id: 21,
        type: "open",
        question: "Hva heter den siste dagen i året?",
        correct_answer: "Nyttårsaften"
    },
    {
        id: 22,
        type: "open",
        question: "Hvor mange timer er det i ett døgn?",
        correct_answer: "24"
    },
    {
        id: 23,
        type: "open",
        question: "Du trenger 2 meter bånd til hver gave. Hvor mange meter trenger du til 5 gaver?",
        correct_answer: "10 meter"
    },
    {
        id: 24,
        type: "open",
        question: "Hvilken dato er dagen etter julaften?",
        correct_answer: "25. desember"
    }
];

async function seed() {
    try {
        // Connect to MongoDB.
        await mongoose.connect(process.env.MONGO_URI);

        // Choose the quizzes collection.
        const collection = mongoose.connection.db.collection("quizzes");

        // Save all questions inside one quiz document.
        await collection.updateOne(
            { _id: "christmas-quiz" },
            {
                $set: {
                    questions: questions,
                    updatedAt: new Date()
                },
                $setOnInsert: {
                    createdAt: new Date()
                }
            },
            { upsert: true }
        );

        console.log("Saved " + questions.length + " questions!");
    } catch (error) {
        console.log(error.message);
    } finally {
        await mongoose.disconnect();
    }
}

module.exports = questions;

// Run only when you type: node seed.js
if (require.main === module) {
    seed();
}
