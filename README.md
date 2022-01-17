<h2 align="center"> NotReddit </h2> 
<h3 align="center"> Node.js <el>backend<el> uz upotrebu Express framework-a </h3>

<p align="center">
<img src="https://img.shields.io/badge/Support-Windows%20x64-blue?logo=Windows&style=flat">
<img src="https://img.shields.io/github/license/Marko-Milasinovic-RI/Skript-Jezici-Projekat?style=flat">
<img src="https://tokei.rs/b1/github/Marko-Milasinovic-RI/Skript-Jezici-Projekat?category=code">
</p>

Rešenje za: [projekat](https://drive.google.com/file/d/1np0UaTG_SNgWFCUFaSnQs6tsfe9VAwEA/view)
Rok za predaju: **_17/Jan/2021_**

# [💾Download Latest Stable Build](https://github.com/Marko-Milasinovic-RI/Skript-Jezici-Projekat/releases/latest)
Supported Languages: English

## Built and run with
* [Maven](https://mvnrepository.com/artifact/org.openjfx/javafx/16)
* [OpenJavaFX](https://openjfx.io/openjfx-docs/)
* [OpenJDK - runtime](https://www.openlogic.com/openjdk-downloads)

# Servisi
Ovaj projekta implementira ADMIN aplikacije, uz prethodno dozvoljenu upotreba dodatnih biblioteka.
Zahtevani servisi su:
* Rest za eksponiranje podataka u bazi
* Servis za autentifikaciju
* Aplikacioni servis

## REST servis koji eksponira podatke u bazi
* CRUD operacije za sve entitete u bazi
* Validacija na svim korisničkim unosima (Joi ili po slobodnom izboru)
* Autorizacija (korisnika koji je autentifikovan)
* Potrebno je imati minimum 2 vrste korisnika, na primer:
* Admin – može sve
* Moderator – može sve osim da administrira korisnike
* Dozvoljeno je koristiti bilo koju bazu podataka
* Potrebno je minimalno 4 entiteta (modela)
* Minimum 5 unosa u svakom (po potrebi više)

## Servis za autentifikaciju
* Registrovanje korisnika (samo API, ne GUI)
* Autentifikacija (login, JWT, samo API)

## Aplikacioni servis
* Servira HTML i prateće resurse aplikacije (GUI)
* Sve rute treba da budu prefiksovana sa „/admin“ i da se nalaze u posebnim modulima
* Komunicira sa REST servisom (fetch / ajax)
* GUI za administriranje baze (sve CRUD operacije nad svim entitetima)
 * Svaki entitet treba da ima svoje stranice za prikaz spiska, detalja, izmene itd.
* Početna stranica treba da sadrži linkove ka stranicama entiteta
* Validacija na svim korisničkim unosima (Joi ili po slobodnom izboru)
* Dizajn / izgled dokle god ne narušava funkcionalnost se ne ocenjuje

# Dodatni zahtevi
Izvorni kod projekta poslati najkasnije 72 sata pre termina kolokvijuma. Poslati link ka git repozitorijumu (ne kod).

## License
Code licensed under [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.html)
