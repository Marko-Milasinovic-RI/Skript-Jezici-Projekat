# Skript-Jezici-Projekat
Backend treba da bude razvijen u Node.js-u upotrebom Express framework-a. Potrebno je imati 3 backend servisa:
• REST servis koji eksponira podatke u bazi
o CRUD operacije za sve entitete u bazi
o Validacija na svim korisničkim unosima (Joi ili po slobodnom izboru)
o Autorizacija (korisnika koji je autentifikovan)
▪ Potrebno je imati minimum 2 vrste korisnika, na primer:
• Admin – može sve
• Moderator – može sve osim da administrira korisnike
o Dozvoljeno je koristiti bilo koju bazu podataka
▪ Potrebno je minimalno 4 entiteta (modela)
▪ Minimum 5 unosa u svakom (po potrebi više)
• Servis za autentifikaciju
o Registrovanje korisnika (samo API, ne GUI)
o Autentifikacija (login, JWT, samo API)
• Aplikacioni servis
o Servira HTML i prateće resurse aplikacije (GUI)
o Sve rute treba da budu prefiksovana sa „/admin“ i da se nalaze u posebnim modulima
o Komunicira sa REST servisom (fetch / ajax)
o GUI za administriranje baze (sve CRUD operacije nad svim entitetima)
▪ Svaki entitet treba da ima svoje stranice za prikaz spiska, detalja, izmene itd.
▪ Početna stranica treba da sadrži linkove ka stranicama entiteta
o Validacija na svim korisničkim unosima (Joi ili po slobodnom izboru)
o Dizajn / izgled dokle god ne narušava funkcionalnost se ne ocenjuje
Dozvoljena je upotreba dodatnih biblioteka.
Teme su po slobodnom izboru. U okviru ovog dela projekta implementira se ADMIN aplikacija. Korisnička aplikacija će biti implementirana u drugom (ispitnom) delu projekta upotrebom Vue.js frameworka.
Predlog projekta sa kratkim opisom poslati do 17.12.2021. na mail svom asistentu: iciganovic@raf.rs ili pprvulovic@raf.rs
Nakon što je odobren projekat može se početi sa izradom.
Izvorni kod projekta poslati najkasnije 72 sata pre termina kolokvijuma. Poslati link ka git repozitorijumu (ne kod).
Rok za odbranu je zakazani termin u kolokvijumskoj nedelji.
