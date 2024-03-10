require("dotenv").config();
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const calendar_db = require("../db/calendar_db");
const calendar_events = require("../events/calendar_events");

const email = "cs21btech11033@iith.ac.in";

router.get("/get", async (req, res) => {
    try {
        let result = await calendar_db.get_user_by_email(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}
);


module.exports = router;