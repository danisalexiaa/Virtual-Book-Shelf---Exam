"use strict";

const express = require("express");
const sequelize = require("./sequelize");
const cors = require("cors");
const path = require("path");
const port = 7000;
require("./models/book");
require("./models/virtualShelf");

const VirtualShelf = require("./models/virtualShelf");
const Book = require("./models/book");

const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
);
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "build")));

VirtualShelf.hasMany(Book);

app.use("/api", require("./routes/book"));
app.use("/api", require("./routes/virtualShelf"));

app.listen(process.env.PORT, async() => {
    console.log(`Server started on http://localhost:${port}`);
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully!");
    } catch (err) {
        console.error("Unable to connect to db: ", err);
    }
});