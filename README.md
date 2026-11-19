# Julekalender

Jeg lager en digital julekalender for skolen. Elevene skal åpne luker og svare på spørsmål. Læreren skal kunne se svarene og trekke vinnere.

Prosjektet er ikke ferdig ennå.

## Dette har jeg laget

- En forside med 24 luker.
- Et enkelt design med rødt og hvitt.
- Et skjema for navn og AFK-e-post.
- En sjekk som krever at e-posten slutter på @afk.no.
- Lagring av deltakere i MongoDB.
- En sjekk som finner deltakeren hvis e-posten finnes fra før.
- En cookie som kan huske innloggingen i 30 dager.
- 24 spørsmål som er lagret i databasen.
- En side som viser spørsmålet i hver luke.
- Et skjema som lagrer svar i databasen.
- Et enkelt adminpanel som fortsatt er under arbeid.

## Slik bruker eleven nettsiden

1. Eleven åpner nettsiden.
2. Eleven velger Logg inn.
3. Eleven skriver navn og AFK-e-post.
4. Nettsiden sender eleven tilbake til kalenderen.
5. Eleven åpner en ledig luke.
6. Eleven skriver et svar og sender det inn.
7. Nettsiden viser en melding når svaret er lagret.

Nettsiden sjekker bare at e-posten slutter på @afk.no. Den sjekker ikke om personen eier adressen.

## Innlogging

- Nettsiden bruker JWT for å huske deltakeren.
- JWT er et token med deltakerens ID.
- Tokenet ligger i en cookie i nettleseren.
- Serveren sjekker tokenet når en side åpnes.
- Nettsiden kan da hente navnet fra databasen og vise en hilsen.
- Tokenet og cookien varer i opptil 30 dager.
- Hvis cookien slettes, må deltakeren logge inn igjen.
- En annen nettleser krever også ny innlogging.
- En omstart av serveren trenger ikke å logge ut brukeren. Den samme hemmelige nøkkelen må fortsatt brukes.

## Luker og dato

- Kalenderen har 24 luker.
- Lukene skal være låst før desember.
- Den 5. desember skal luke 1 til 5 være åpne.
- Framtidige luker skal være låst.
- Serveren sjekker datoen når en luke åpnes.
- Jeg må fortsatt legge til datokontroll når svar sendes inn.

## Adminpanelet

- Elever har rollen student.
- En lærer kan få rollen admin i databasen.
- Panelet har bokser for deltakere, svar og vinnere.
- Jeg arbeider med å vise antall deltakere og svar.
- Antall vinnere står på null. Trekningen er ikke laget ennå.
- Lister over deltakere og svar er ikke ferdige.
- Admininnloggingen må testes og forbedres før andre bruker løsningen.

## Verktøyene jeg bruker

- HTML lager innholdet på sidene.
- CSS bestemmer farger, størrelser og plassering.
- EJS viser data i HTML, for eksempel et navn eller et spørsmål.
- Node.js kjører JavaScript på serveren.
- Express viser sider og tar imot skjemaer.
- MongoDB lagrer opplysningene.
- Mongoose hjelper koden med å hente og lagre data.
- JWT og cookie-parser brukes til innlogging.
- dotenv leser innstillingene fra .env.
- MongoDB Compass viser hva som finnes i databasen.

## Filene i prosjektet

- app.js inneholder serveren, sidene og behandlingen av skjemaer.
- models/user.js beskriver en deltaker med navn, e-post og rolle.
- models/answear.js beskriver et innsendt svar.
- seed.js inneholder spørsmålene og lagrer dem i databasen.
- models/question.js er fra den gamle måten å lagre spørsmål på. Den brukes ikke til å hente quizen nå.
- views inneholder sidene som vises i nettleseren.
- views/partials inneholder felles topp, meny og bunn.
- public/css/index.css inneholder designet.
- .env inneholder databaseadressen og en hemmelig nøkkel.
- .gitignore hindrer at blant annet .env blir lagt på GitHub.

## Databasen

Databasen heter christmas. Den har tre viktige samlinger:

- users lagrer navn, e-post og rolle.
- quizzes lagrer alle spørsmålene i dokumentet christmas-quiz.
- answears lagrer svarene.

Hvert lagret svar inneholder:

- ID-en til deltakeren.
- Nummeret på luken.
- Teksten som deltakeren svarte.

Den gamle samlingen questions kan fortsatt finnes. Nettsiden bruker nå quizzes til spørsmålene.

## Starte nettsiden

1. Åpne prosjektet i VS Code.
2. Sjekk at Node.js og pakkene er installert.
3. Sjekk at MongoDB kjører.
4. Sjekk databaseadressen og den hemmelige nøkkelen i .env.
5. Start app.js fra terminalen.
6. Åpne http://localhost:4000 i nettleseren.

Andre viktige punkter:

- MONGO_URI er navnet på databaseadressen i .env.
- SECRET_JWT er navnet på den hemmelige nøkkelen.
- seed.js kjøres fra terminalen for å legge inn eller oppdatere spørsmålene.
- .env skal ikke deles eller legges på GitHub.

## Hvis noe ikke virker

- Nettsiden åpnes ikke: Sjekk at serveren kjører.
- Databasen kobler ikke til: Sjekk MongoDB og adressen i .env.
- Innloggingen virker ikke: Sjekk at SECRET_JWT er satt.
- Du har endret .env: Start serveren på nytt.
- En deltaker mangler i Compass: Åpne christmas og users. Fjern søkefiltre og oppdater siden.
- Spørsmålene mangler: Sjekk om seed.js er kjørt.
- En variabel er ikke definert: Sjekk at navnet er likt i app.js og EJS-filen.
- En luke er låst: Sjekk datoen. I november skal lukene være låst.
- Se også etter feilmeldinger i terminalen.

Brukeren kan kontakte ansvarlig lærer for hjelp. Ikke del passord eller hemmelige nøkler.

## Videre arbeid

- Fullføre datokontrollen for innsending av svar.
- Bestemme om en elev kan svare flere ganger på samme luke.
- Gjøre admininnloggingen tryggere.
- Vise deltakere og svar i adminpanelet.
- La læreren markere svar som riktige eller gale.
- La læreren endre spørsmål og innhold.
- Trekke en tilfeldig vinner blant deltakere med riktige svar.
- Lagre vinneren og vise navnet i den gamle luken.
- Vise bilder og video.
- Teste nettsiden på mobil og med tastatur.
- Lage en skisse av databasen.
- Oppdatere README og planlegge arbeidet i GitHub.

Linux-oppsettet gjør jeg selv. Jeg skriver om dette når det er gjort.

## GitHub-prosjekt

My-Christmas-website
