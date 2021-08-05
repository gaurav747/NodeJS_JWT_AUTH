const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
    userid: String,
    token: String,
    device: String,
});

module.exports = mongoose.model("many", tokenSchema, "");
