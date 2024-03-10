require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const calendar_db = require("../db/calendar_db");
const calendar_events = require("../events/calendar_events");

router.get("/get", async (req, res) => {
    // hello world
    res.send("Hello World");
}
);


module.exports = router;