require("dotenv").config();

const express = require("express");
const session = require("express-session");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: process.env.SESSION_EXPIRY_IN_DAYS * 24 * 60 * 60 * 1000,
        },
    })
);


app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: "GET, PUT, DELETE, UPDATE, POST",
        credentials: true,
    })
);

// use this endpoint if you are running only backend but you get an error after you login with you insitute id (please check the url carefully when you get error, url may be of frontend. You will not get an error if you are running the frontend at same time).
app.get("/", (req, res) => {
    res.send("Hello World");
});

const CalendarRouter = require("./routes/calendar");
app.use("/api/calendar", CalendarRouter);

const start_server = async () => {
    app.listen(process.env.SERVER_PORT, async () => {
        console.log(`Server started on port ${process.env.SERVER_PORT}`);
    });
};

start_server();
