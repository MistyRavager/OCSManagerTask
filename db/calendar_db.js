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
    // let query = `SELECT * FROM calendar_events, user_calendar_events WHERE calendar_events.id = user_calendar_events.calendar_event_id AND user_calendar_events.user_id = '${user_id}' AND ((calendar_events.start_time >= '${start_timestamp}' AND calendar_events.end_time <= '${end_timestamp}') OR (calendar_events.start_time <= '${start_timestamp}' AND calendar_events.end_time >= '${start_timestamp}') OR (calendar_events.start_time <= '${end_timestamp}' AND calendar_events.end_time >= '${end_timestamp}'))  ORDER BY calendar_events.start_time, calendar_events.end_time;`;

    // convert the 3 cases above to 1 case
    let query = `SELECT * FROM calendar_events, user_calendar_events WHERE calendar_events.id = user_calendar_events.calendar_event_id AND user_calendar_events.user_id = '${user_id}' AND ((calendar_events.start_time <= '${end_timestamp}' AND calendar_events.end_time >= '${start_timestamp}'))  ORDER BY calendar_events.start_time, calendar_events.end_time;`;

    let result = await pool.query(query);
    return result.rows;
}

calendar_db.add_calendar_event = async (title, description, start_time, end_time) => {

    let query = `INSERT INTO calendar_events (title, description, start_time, end_time) VALUES ('${title}', '${description}', '${start_time}', '${end_time}') RETURNING id;`;
    let result = await pool.query(query);
    console.log(result);
    
    return result.rows[0].id;
}

calendar_db.add_user_calendar_event = async (user_id, calendar_event_id) => {
    let query = `INSERT INTO user_calendar_events (user_id, calendar_event_id) VALUES ('${user_id}', '${calendar_event_id}');`;
    let result = await pool.query(query);
    return result;
}

module.exports = calendar_db;
