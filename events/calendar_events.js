require("dotenv").config();

const calendar_db = require("../db/calendar_db");
const dayjs = require("dayjs");
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Kolkata");

function isNumeric(value) {
    //return /^-{0,1}\d+$/.test(value)
    return !isNaN(value);
}

const get_calendar_by_month = async (email, year, month) => {
    try {
        let result = await calendar_db.get_user_by_email(email);
        if (result.length === 0) {
            return "No user found with this email";
        } else {
            let user_id = result[0].id;
            if (isNumeric(year) && isNumeric(month)) {
                let start_timestamp = dayjs.tz(`${year}-${month}-01`, "Asia/Kolkata").startOf("month").format("YYYY-MM-DD HH:mm:ss");
                let end_timestamp = dayjs.tz(`${year}-${month}-01`, "Asia/Kolkata").endOf("month").format("YYYY-MM-DD HH:mm:ss");
                
                let events = await calendar_db.get_events_by_time_range(user_id, start_timestamp, end_timestamp);
                
                let calendar = {};
                for (let i = 1; i <= dayjs(`${year}-${month}-01`).daysInMonth(); i++) {
                    calendar[i] = [];
                }
                for (let i = 0; i < events.length; i++) {
                    let event = events[i];
                    let start_date = dayjs(event.start_time).tz("Asia/Kolkata");
                    let end_date = dayjs(event.end_time).tz("Asia/Kolkata");
                    event.start_time = dayjs(event.start_time).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
                    event.end_time = dayjs(event.end_time).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
                    let start_day = start_date.date();
                    let end_day = end_date.date();
                    for (let j = start_day; j <= end_day; j++) {
                        calendar[j].push(event);
                    }
                }
                return calendar;
            } else {
                return "Invalid year or month";
            }
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

const get_calendar_of_today = async (email) => {
    try {
        let result = await calendar_db.get_user_by_email(email);
        if (result.length === 0) {
            return "No user found with this email";
        } else {
            let user_id = result[0].id;
            let start_timestamp = dayjs.tz(dayjs().startOf("day"), "Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
            let end_timestamp = dayjs.tz(dayjs().endOf("day"), "Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
            console.log(start_timestamp, end_timestamp);
            let events = await calendar_db.get_events_by_time_range(user_id, start_timestamp, end_timestamp);
            events = events.map((event) => {
                event.start_time = dayjs(event.start_time).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
                event.end_time = dayjs(event.end_time).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
                return event;
            });
            return events;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports = {
    get_calendar_by_month,
    get_calendar_of_today
};
