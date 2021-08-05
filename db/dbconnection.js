const mongoose = require("mongoose");
const config = require("../config/config");
require('dotenv').config()
//=================================================================
var {
    db: { host, port, name },
} = config;
const connectionString2 = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const conn = mongoose.createConnection(connectionString2, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Connected to second Db => ${process.env.DB_NAME}`)
    }
})
module.exports = conn;