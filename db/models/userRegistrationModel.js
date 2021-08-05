const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validate = require("mongoose-validator");
const conn = require("../dbconnection");

var nameValidator = [
    validate({
        validator: "isLength",
        arguments: [5, 30],
        message: "Fullname should be between 5 to 30 Characters."
    })
];
var mobileValidator = [
    validate({
        validator: "matches",
        arguments: ['^[0-9]', 'i'],
        message: "Mobile number should be 10 digits."
    })
];
var mobileValidator2 = [
    validate({
        validator: "isLength",
        arguments: [10],
        message: "Mobile number should be 10 digits."
    })
];
var emailValidator = [
    validate({
        validator: 'matches',
        arguments: ['^[a-zA-Z-]+$', 'i'],
    })
];

const userSchema = new Schema(
    {
        userid: { type: String, required: true },
        fullname: { type: String, required: true, validate: nameValidator },
        mobile: { type: String, required: true, validator: [mobileValidator, mobileValidator2] },
        email: { type: String, required: true, validator: emailValidator },
        password: { type: String, required: true, validate: nameValidator },
    },
    {
        timestamps: true
    }
);

module.exports = conn.model("user1", userSchema, "users");
