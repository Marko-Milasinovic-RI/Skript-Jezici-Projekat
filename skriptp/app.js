const BP = require("body-parser");
const app = express();
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");
const { JsonWebTokenError } = require("jsonwebtoken");
const { sequelize } = require("./models");
require("dotenv").config();

app.use(BP.json());
app.use(BP.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'static')));


function adminAuth(req, res, next) {
    const jwtToken = getAllCookies(req)["token"];

    jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (user.role != "ADMIN") { return res.redirect(307, '/admin/index'); }

        req.user = user;
        next();
    });
}

// 0 = cookie_name, 1 = cookie_payload
function getAllCookies(req) {
    if (req.headers.cookie == null) {
        console.log("Invalid cookie");
        return {};
    }

    const allCookies = {};
    const cookies = req.headers.cookie.split("; ");

    cookies.forEach(element => {
        const allCookies = element.split("=");
        allCookies[allCookies[0]] = allCookies[1];
    });

    return allCookies;
}

function authToken(req, res, next) {
    const jwtToken = getAllCookies(req)["token"];

    if (jwtToken == null) { return res.redirect(307, '/admin/login'); }

    jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) { return res.redirect(307, '/admin/login'); }

        if (user.role != "ADMIN") { return res.redirect(307, "/admin/login"); }

        req.user = user;
        next();
    });
}

app.get("/admin/index", authToken, (req, res) => {
    res.sendFile("index.html", {root: "./static/admin"});
});

app.get("/admin/users", [authToken, adminAuth], (req, res) => {
    res.sendFile("users.html", {root: "./static/admin"});
});

app.get("/admin/login", (req, res) => {
    res.sendFile("login.html", {root: "./static/admin"});
});

app.get("/admin/register", (req, res) => {
    res.sendFile("register.html", {root: "./static/admin"});
});

app.get("/admin/aPosts", authToken, (req, res) => {
    res.sendFile("aPosts.html", {root: "./static/admin"});
});

app.get("/admin/adminPosts", authToken, (req, res) => {
    res.sendFile("adminPosts.html", {root: "./static/admin"});
});

app.get("/admin/cPosts", authToken, (req, res) => {
    res.sendFile("cPosts.html", {root: "./static/admin"});
});

app.get("/admin/creatorPosts", authToken, (req, res) => {
    res.sendFile("creatorPosts.html", {root: "./static/admin"});
});

app.listen({ port: 8001 }, async () => {
    await sequelize.authenticate();
    console.log("Main app is listening on port: 8001");
});