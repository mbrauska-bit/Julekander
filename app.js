const express = require("express"); // Lager nettsiden og rutene.
const mongoose = require("mongoose"); // Henter og lagrer data i MongoDB.
const jwt = require("jsonwebtoken"); // Lager og kontrollerer innloggingstoken.
const cookieParser = require("cookie-parser"); // Leser cookies fra nettleseren.
const User = require("./models/user");
const Answear = require("./models/answear");
require("dotenv").config(); // Leser innstillingene fra .env.

const app = express();
app.set("view engine", "ejs"); // Bruk EJS for å vise sidene.
app.use(express.urlencoded({ extended: true })); // Les feltene i HTML-skjemaer.
app.use(express.static("public")); // Gjør CSS og andre offentlige filer tilgjengelige.
app.use(cookieParser());

// Les cookien, sjekk tokenet og hent brukeren.
app.use(async (req, res, next) => {
    res.locals.bruker = null; // Ingen er innlogget før tokenet er sjekket.
    const token = req.cookies.jwt; // Hent tokenet fra nettleseren.
    if (!token) return next(); // Ingen cookie: fortsett uten innlogging.

    let innhold;
    try {
        innhold = jwt.verify(token, process.env.SECRET_JWT); // Sjekk signatur og utløpsdato.
    } catch (error) {
        res.clearCookie("jwt"); // Fjern tokenet hvis det er ugyldig eller utløpt.
        return next();
    }
    if (!mongoose.isValidObjectId(innhold.userId)) {
        res.clearCookie("jwt");
        return next();
    }
    res.locals.bruker = await User.findById(innhold.userId); // Hent personen og gjør den tilgjengelig i EJS.
    if (!res.locals.bruker) res.clearCookie("jwt");
    next();
});
function aapneLuker(){
    const dato = new Date(); // how many doors are avaible
    const dag = dato.getDate(); // gets the current date and time computers running the server
    const maaned = dato.getMonth() + 1; // gets the day of the month. On December 5, dag is 5
    if (maaned !== 12){
        return 0;
    }
    return Math.min(dag,24);

}
// Vis sidene.
app.get("/", (req, res) => {
    let antall = aapneLuker();
    if (res.locals.bruker && res.locals.bruker.rolle === "admin") {
        antall = 24; // Admin kan forhåndsvise alle lukene.
    }
    res.render("index",{
        aapneLuker: antall
    });
});
app.get("/login", (req, res) => {
    if (res.locals.bruker) return res.redirect("/");
    res.render("login",
        { navn: "",
         email: "",
          feil: "" });
});
app.get("/admin", async (req, res) => {
    // Brukeren er allerede hentet etter at JWT-tokenet er kontrollert.
    const user = res.locals.bruker;
    if (!user) {
        return res.redirect("/login");
    }
    if (user.rolle !== "admin") {
        return res.redirect("/");
    }

    const antallDeltakere = await User.countDocuments();
    const antallSvar = await Answear.countDocuments();
    const antallVinnere = 0;
    res.render("admin", {
        antallDeltakere: antallDeltakere,
        antallSvar: antallSvar,
        antallVinnere: antallVinnere
    });
});

// Finn brukeren. Lagre en ny hvis e-posten ikke finnes.
app.post("/login", async (req, res) => {
    const { navn, email } = req.body; // Les navn og e-post fra skjemaet.
    if (typeof navn !== "string" || typeof email !== "string") {
        return res.status(400).send("Fyll ut navn og e-post.");
    }
    if (!navn.trim() || !email.trim()) {
        return res.status(400).send("Fyll ut navn og e-post.");
    }
    const renEmail = email.trim().toLowerCase(); // Fjern mellomrom og bruk små bokstaver.
    if (!renEmail.endsWith("@afk.no")) { // Sjekker bare slutten, ikke hvem som eier adressen.
        return res.status(400).render("login", {
            navn: navn.trim(), email: renEmail, feil: "Bruk AFK-e-posten din."
        });
    }
    let user = await User.findOne({ email: renEmail }); // Se om personen er registrert fra før.
    if (!user) {
        user = new User({ navn: navn.trim(), email: renEmail });
        await user.save(); // Lagre bare hvis personen er ny.
    }
   // Lag et token som inneholder brukerens ID.
const token = jwt.sign(
    { userId: user._id.toString() },
    process.env.SECRET_JWT,
    { expiresIn: "30d" } // Tokenet blir ugyldig etter 30 dager.
);

// Legg tokenet i en cookie i nettleseren.
res.cookie("jwt", token, {
    httpOnly: true, // JavaScript i nettleseren kan ikke lese cookien.
    sameSite: "lax", // Begrenser når cookien sendes fra andre nettsider.
    maxAge: 30 * 24 * 60 * 60 * 1000 // Nettleseren beholder cookien i 30 dager.
});
    res.redirect("/");
});

// Hent quizen og finn spørsmålet til denne luken.
app.get("/luke/:nummer", async (req, res) => {
    if (!res.locals.bruker) return res.redirect("/login");
    const nummer = Number(req.params.nummer); // /luke/5 gir tallet 5.
    if (!Number.isInteger(nummer) || nummer < 1 || nummer > 24) {
        return res.status(400).send("Ugyldig luke.");
    }
    const collection = mongoose.connection.db.collection("quizzes");
    const quiz = await collection.findOne({ _id: "christmas-quiz" });
    if (!quiz) return res.status(404).send("Quizen finnes ikke. Kjør node seed.js.");
    const question = quiz.questions.find(item => item.id === nummer); // Finn spørsmålet med samme nummer.
    if (!question) return res.status(404).send("Spørsmålet finnes ikke.");
    if (nummer > aapneLuker() && res.locals.bruker.rolle !== "admin") {
        return res.status(403).send("Denne luken er låst")
    }
    res.render("luke", { question });
 
});

// Hent spørsmålet igjen før vi lagrer svaret.
app.post("/luke/:nummer", async (req, res) => {
    if (!res.locals.bruker) return res.redirect("/login");
    const nummer = Number(req.params.nummer);
    const svar = req.body.svar; // Les teksten deltakeren sendte inn.
    if (!Number.isInteger(nummer) || nummer < 1 || nummer > 24) {
        return res.status(400).send("Ugyldig luke.");
    }
    // Admin kan forhåndsvise, men ingen kan sende svar til framtidige luker.
    if (nummer > aapneLuker()) {
        return res.status(403).send("Denne luken er låst.");
    }
    if (typeof svar !== "string" || !svar.trim()) {
        return res.status(400).send("Skriv et svar.");
    }
    const collection = mongoose.connection.db.collection("quizzes");
    const quiz = await collection.findOne({ _id: "christmas-quiz" });
    if (!quiz) return res.status(404).send("Quizen finnes ikke. Kjør node seed.js.");
    const question = quiz.questions.find(item => item.id === nummer);
    if (!question) return res.status(404).send("Spørsmålet finnes ikke.");
    const answear = new Answear({
        bruker: res.locals.bruker._id, luke: nummer, svar: svar.trim()
    });
    await answear.save(); // Vent til svaret er lagret i MongoDB.
    res.send("Svaret ditt er lagret!");
});

// Vis en beskjed hvis databasen gir en feil.
app.use((error, req, res, next) => {
    console.log(error.message);
    res.status(500).send("Noe gikk galt. Prøv igjen.");
});
mongoose.connect(process.env.MONGO_URI) // Koble til databasen fra .env.
    .then(() => console.log("MongoDB connected"))
    .catch(error => console.log(error.message));
app.listen(4000, () => { // Åpne nettsiden på port 4000.
  console.log("http://localhost:4000");
});
