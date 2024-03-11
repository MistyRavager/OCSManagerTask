require("dotenv").config();

const calendar_db = require("../db/calendar_db");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");

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
                if (year < 0 || month < 1 || month > 12) {
                    return "Invalid year or month";
                }

                // getting the start and end of the month in IST
                let start_timestamp = dayjs
                    .tz(`${year}-${month}-01`, "Asia/Kolkata")
                    .startOf("month");
                    
                let end_timestamp = dayjs.tz(`${year}-${month}-01`, "Asia/Kolkata").endOf("month");

                // getting the events in the given time range
                let events = await calendar_db.get_events_by_time_range(
                    user_id,
                    start_timestamp.format("YYYY-MM-DD HH:mm:ss"),
                    end_timestamp.format("YYYY-MM-DD HH:mm:ss")
                );

                let calendar = {};
                for (let i = 1; i <= dayjs(`${year}-${month}-01`).daysInMonth(); i++) {
                    calendar[i] = [];
                }

                // adding the events to the calendar day-wise
                for (let i = 0; i < events.length; i++) {
                    let event = events[i];
                    let start_date = dayjs(event.start_time).tz("Asia/Kolkata");
                    let end_date = dayjs(event.end_time).tz("Asia/Kolkata");
                    
                    // converting the start and end times to IST (because the database returns the times in UTC)
                    event.start_time = dayjs(event.start_time)
                        .tz("Asia/Kolkata")
                        .format("YYYY-MM-DD HH:mm:ss");

                    event.end_time = dayjs(event.end_time)
                        .tz("Asia/Kolkata")
                        .format("YYYY-MM-DD HH:mm:ss");

                    let start_day = start_date.date();
                    let end_day = end_date.date();

                    if (start_date < start_timestamp) {
                        start_day = 1;
                    }
                    if (end_date > end_timestamp) {
                        end_day = dayjs(`${year}-${month}-01`).daysInMonth();
                    }

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

const get_calendar_by_date = async (email, year, month, day) => {
    try {
        let result = await calendar_db.get_user_by_email(email);
        if (result.length === 0) {
            return "No user found with this email";
        } else {
            let user_id = result[0].id;
            if (isNumeric(year) && isNumeric(month) && isNumeric(day)) {
                if (year < 0 || month < 1 || month > 12 || day < 1 || day > 31) {
                    return "Invalid year or month or day";
                }

                // getting the start and end of given day in IST
                let start_timestamp = dayjs
                    .tz(`${year}-${month}-${day}`, "Asia/Kolkata")
                    .startOf("day");

                let end_timestamp = dayjs
                    .tz(`${year}-${month}-${day}`, "Asia/Kolkata")
                    .endOf("day");

                let events = await calendar_db.get_events_by_time_range(
                    user_id,
                    start_timestamp.format("YYYY-MM-DD HH:mm:ss"),
                    end_timestamp.format("YYYY-MM-DD HH:mm:ss")
                );

                // converting the start and end times to IST (because the database returns the times in UTC)
                events = events.map((event) => {
                    event.start_time = dayjs(event.start_time)
                        .tz("Asia/Kolkata")
                        .format("YYYY-MM-DD HH:mm:ss");

                    event.end_time = dayjs(event.end_time)
                        .tz("Asia/Kolkata")
                        .format("YYYY-MM-DD HH:mm:ss");

                    return event;
                });

                return events;
            } else {
                return "Invalid year or month or day";
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
            
            // getting the start and end of today in IST
            let start_timestamp = dayjs
                .tz(dayjs().startOf("day"), "Asia/Kolkata")
                .format("YYYY-MM-DD HH:mm:ss");

            let end_timestamp = dayjs
                .tz(dayjs().endOf("day"), "Asia/Kolkata")
                .format("YYYY-MM-DD HH:mm:ss");

            let events = await calendar_db.get_events_by_time_range(
                user_id,
                start_timestamp,
                end_timestamp
            );

            // converting the start and end times to IST (because the database returns the times in UTC)
            events = events.map((event) => {
                event.start_time = dayjs(event.start_time)
                    .tz("Asia/Kolkata")
                    .format("YYYY-MM-DD HH:mm:ss");
            
                event.end_time = dayjs(event.end_time)
                    .tz("Asia/Kolkata")
                    .format("YYYY-MM-DD HH:mm:ss");
            
                return event;
            });

            return events;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};

const add_calendar_event = async (email, event) => {
    try {
        let result = await calendar_db.get_user_by_email(email);
        if (result.length === 0) {
            return "No user found with this email";
        } else {
            let start_time = dayjs
                .tz(event.start_time, "Asia/Kolkata")
                .format("YYYY-MM-DD HH:mm:ss");

            let end_time = dayjs.tz(event.end_time, "Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss");
            let title = event.title;
            let description = event.description;

            let calendar_event_id = await calendar_db.add_calendar_event(
                title,
                description,
                start_time,
                end_time
            );

            let user_ids = event.user_ids;

            // can be optimized by using a single query
            for (let i = 0; i < user_ids.length; i++) {
                await calendar_db.add_user_calendar_event(user_ids[i], calendar_event_id);
            }
        }
        return "Event added";
    } catch (error) {
        console.log(error);
        return error;
    }
};

module.exports = {
    get_calendar_by_month,
    get_calendar_of_today,
    get_calendar_by_date,
    add_calendar_event,
};
