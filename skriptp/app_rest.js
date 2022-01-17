const app = express();
const bcrypt = require('bcrypt');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');
const { sequelize, Users } = require('./models');
require('dotenv').config();

const adminposts_route = require("./routes/adminposts_route");
const aposts_route = require("./routes/aposts_route");
const creatorposts_route = require("./routes/creatorposts_route");
const cposts_route = require("./routes/cposts_route");
const users_route = require("./routes/users_route");

var corsOptions = {
    origin: 'http://localhost:8001',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use("/api", adminposts_route);
app.use("/api", aposts_route);
app.use("/api", creatorposts_route);
app.use("/api", cposts_route);
app.use("/api", users_route);

app.listen({ port: 10001 }, async () => {
    await sequelize.authenticate();
    console.log("Rest app is listening on port: 10001");
});