// Below line should always be 1st line in any .js file
require("dotenv").config;

// import installed packages (ones installed using npm/yarn)
const {Pool} = require("pg");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.CALENDAR_DATABASE_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
    },
});

console.log("DB connected");

let calendar_db = {};

const check_for_null = (input) => {
    if (input === null) {
        return null;
    } else {
        if (input === "") {
            return null;
        } else {
            return input;
        }
    }
};

calendar_db.get_user_by_email = async (email) => {
    let query = `SELECT * FROM users WHERE email = '${email}';`;
    let result = await pool.query(query);
    return result.rows;
}

calendar_db.get_events_by_time_range = async (user_id, start_timestamp, end_timestamp) => {
    // get the datetime objects in the local timezone
    let query = `SELECT calendar_events.title, calendar_events.description, calendar_events.start_time AT TIME ZONE 'Asia/Kolkata' AS start_time, calendar_events.end_time AT TIME ZONE 'Asia/Kolkata' AS end_time FROM calendar_events, user_calendar_events WHERE calendar_events.id = user_calendar_events.calendar_event_id AND user_calendar_events.user_id = '${user_id}' AND calendar_events.start_time >= '${start_timestamp}' AND calendar_events.end_time <= '${end_timestamp}' ORDER BY calendar_events.start_time, calendar_events.end_time;`;
    
    
    let result = await pool.query(query);
    return result.rows;
}

module.exports = calendar_db;
