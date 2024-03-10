// Below line should always be 1st line in any .js file
require("dotenv").config;

// import installed packages (ones installed using npm/yarn)
const {Pool} = require("pg");
var SqlString = require("sqlstring");

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
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
    let query = `SELECT * FROM users WHERE email = '${email}'`;
    let result = await execute(query);
    return result.rows;
}


function execute(query) {
    return new Promise((resolve, reject) => {
        pool.query(query, (err, results) => {
            if (err) {
                return reject(err);
            }
            return resolve(results);
        });
    });
}

function execute_obj(query, obj) {
    return new Promise((resolve, reject) => {
        var sql_s = SqlString.format(query, obj);
        pool.query(sql_s, (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
    });
}

module.exports = calendar_db;
