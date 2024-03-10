require("dotenv").config();

const calendar_db = require("../db/calendar_db");

function isNumeric(value) {
    //return /^-{0,1}\d+$/.test(value)
    return !isNaN(value);
}


module.exports = {
};
