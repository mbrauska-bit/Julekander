# Julekalender

Jeg lager en digital julekalender for skolen.
Elevene skal åpne luker og svare på spørsmål.
Læreren skal kunne se svarene og trekke vinnere.
Prosjektet er fortsatt under arbeid.

## Dette har jeg laget

- En forside med 24 klikkbare luker.
- Et enkelt design med rødt og hvitt.
- Et skjema for navn og AFK-e-post.
- Lagring av deltakere og svar i MongoDB.
- En sjekk som finner e-posten hvis deltakeren finnes fra før.
- JWT og en cookie som kan huske innloggingen i 30 dager.
- En hilsen med navnet til den innloggede deltakeren.
- 24 spørsmål og video i enkelte luker.
- Datolås når elever åpner framtidige luker.
- Mulighet for admin til å åpne alle lukene for testing.
- Et adminpanel med antall brukere og innsendte svar.

## Slik bruker eleven nettsiden

1. Åpne nettsiden og velg Logg inn.
2. Skriv navn og e-post som slutter på @afk.no.
3. Åpne en tilgjengelig luke og les spørsmålet.
4. Skriv svaret og trykk Send svar.
5. Les meldingen om at svaret er lagret.

E-postkontrollen bekrefter ikke hvem som eier adressen.
Hvis cookien slettes, må deltakeren logge inn igjen.

## Verktøyene jeg bruker

- HTML lager innholdet, og CSS bestemmer utseendet.
- EJS viser data, for eksempel navn og spørsmål.
- Node.js kjører JavaScript på serveren.
- Express viser sider og tar imot skjemaer.
- MongoDB lagrer data, og Mongoose brukes til å hente og lagre dem.
- JWT og cookie-parser brukes til innlogging.
- dotenv leser innstillingene fra .env.
- MongoDB Compass brukes til å se innholdet i databasen.

## De viktigste filene

- app.js inneholder serveren og rutene til sidene.
- models/user.js beskriver navn, e-post og rolle.
- models/answear.js beskriver deltakeren, luken og svaret.
- seed.js inneholder og lagrer de 24 spørsmålene.
- views inneholder EJS-sidene.
- views/partials inneholder felles topp, meny og bunn.
- public/css/index.css inneholder designet.
- .env inneholder databaseadressen og den hemmelige JWT-nøkkelen.
- .gitignore hindrer at .env og node_modules legges på GitHub.

## Databasen

- Databasen heter christmas.
- users lagrer navn, e-post og rolle.
- quizzes lagrer alle spørsmålene i dokumentet christmas-quiz.
- answears lagrer deltakerens ID, lukens nummer og svaret.
- Den gamle samlingen questions er slettet.
- models/question.js er fra den gamle løsningen og brukes ikke nå.

## Starte nettsiden

- Node.js, prosjektets pakker og MongoDB må være på plass.
- Jeg starter app.js fra terminalen.
- Lokalt åpnes siden på http://localhost:4000.
- MONGO_URI og SECRET_JWT må være satt i .env.
- seed.js kjøres for å legge inn eller oppdatere spørsmålene.
- Passord og hemmelige nøkler skal ikke deles.

## GitHub og Linux-server

- Repository: https://github.com/mbrauska-bit/Julekander.
- Jeg har brukt Git og jobbet med en konflikt i README.
- VM-en bruker Ubuntu 26.04.1 LTS og heter hey.
- IP-adressen er 10.12.13.21, og SSH-brukeren min heter jul.
- Jeg har koblet VM-en til GitHub og hentet prosjektet.
- Nettsidens adresse er http://10.12.13.21:4000/.
- Adressen krever tilgang til serverens private nettverk.
- Nginx er installert og viser active (running) og enabled.
- Jeg bruker VM-en for å lære å sette opp og drifte en Linux-server.
- GitHub lagrer koden. VM-en kjører nettsiden for brukerne.
- Jeg kobler til VM-en med SSH fra Windows og kan arbeide i terminalen der.
- Da Nginx ikke ble funnet, jobbet jeg med pakkelisten og installasjonen.
- Jeg sjekket etterpå at Nginx kjørte og var satt til å starte automatisk.
- Koblingen fra Nginx til appen på port 4000 må fortsatt testes og dokumenteres.

## Hvis noe ikke virker

- Sjekk at serveren og MongoDB kjører. Les feilen i terminalen.
- Sjekk .env, og start serveren på nytt etter endringer.
- I Compass: åpne riktig database, fjern filtre og oppdater.
- Mangler spørsmål eller video, sjekk seed.js og quizzes.
- Er en variabel ikke definert, sjekk lik skrivemåte i JS og EJS.
- En låst luke kan skyldes datoen. Admin kan forhåndsvise lukene.
- Kontakt ansvarlig lærer ved behov. Ikke del hemmelige verdier.

## Videre arbeid

- Fullføre datolås ved innsending og forbedre adminadgangen.
- Vise lister, vurdere svar, trekke vinnere og lagre vinnernavn.
- La læreren endre innhold, legge til bilder og teste mobil og tastatur.
- Koble Nginx til appen og bekrefte PM2 og oppstart etter omstart.
- Fullføre SSH-tilgang for lærere, databaseskisse og GitHub Project.
- Dokumentere VM-ressurser, rettigheter, IP-plan og tester.
