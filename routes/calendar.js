require("dotenv").config();

const router = require("express").Router();

const calendar_db = require("../db/calendar_db");
const calendar_events = require("../events/calendar_events");

const email = "cs21btech11033@iith.ac.in";

router.get("/", async (req, res) => {
    try {
        let result = await calendar_db.get_user_by_email(email);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

router.get("/get_calendar_by_month/:year/:month", async (req, res) => {
    try {
        let year = req.params.year;
        let month = req.params.month;
        let result = await calendar_events.get_calendar_by_month(email, year, month);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

router.get("/get_calendar_today", async (req, res) => {
    try {
        let result = await calendar_events.get_calendar_of_today(email);
        res.status(200).json(result);
    } catch (error) {   
        res.status(500).json(error);
    }
}
);

module.exports = router;