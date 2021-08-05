
User = require("../db/models/userRegistrationModel");

exports.getUserProfile = async function (req, res) {
    try {
        User.findOne({ userid: req.userid }, (err, user) => {
            if (err) {
                console.log(err)
            } else if (user) {
                console.log(user)
                return res.status(200).send({
                    statuscode: 200,
                    data: user,
                    message: "User profile retrieved successfully",
                });
            }
        })
    } catch (error) {
        return res.status(401).send({
            statuscode: 401,
            error: error,
            message: "Server error",
        });

    }
}

exports.editUserProfileService = async function (req, res) {
    try {
        const input = req.body;
        if (!input.password || !input.fullname || input.passwoprd == "" || input.fullname == "") {
            return res.status(401).send({
                statuscode: 401,
                data: null,
                message: "provide all parameters",
            });
        } else {
            User.findOneAndUpdate({ userid: req.userid }, { $set: { fullname: input.fullname, password: input.password } }, (err, user) => {
                if (err) {
                    console.log(err)
                    return res.status(404).send({
                        statuscode: 404,
                        error: err,
                        message: "Error in updating user profile",
                    });
                } else if (user) {
                    return res.status(200).send({
                        statuscode: 200,
                        data: user,
                        message: "User profile updated successfully",
                    });
                }
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            statuscode: 500,
            error: error,
            message: "Server Error",
        });
    }
}

exports.deleteProfileService = async function (req, res) {
    try {
        const input = req.body;
        if (!input.mobile || !input.email || input.mobile == "" || input.email == "") {
            return res.status(401).send({
                statuscode: 401,
                data: null,
                message: "provide all parameters",
            });
        } else {
            User.findOneAndDelete({ userid: req.userid }, (err, user) => {
                if (err) {
                    console.log(err)
                    return res.status(404).send({
                        statuscode: 404,
                        error: err,
                        message: "Error in deleteing user profile",
                    });
                } else if (user) {
                    return res.status(200).send({
                        statuscode: 200,
                        data: user,
                        message: "User deleted successfully",
                    });
                }
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            statuscode: 500,
            error: error,
            message: "Server Error",
        });
    }
}



const { user } = require("../db/dbconnection");
// const { bookingId } = require("../../db/models/CardCreationModel/cardCreationModel")

exports.createcardservice = async function (req, res) {
    try {
        // var data = new Card()
        for (var i = 0; i <= 50000; i++) {
            var a = Math.ceil(Math.random() * 9900000000000000);
            var data = a.toString();
            if (data.length == 16) {
                Card.insertMany({ cardNo: a }, { upsert: true })
            }
        }
        return res.send({
            statuscode: 200,
            data: null,
            message: "Cards Created Successfully"
        })
    } catch (err) {
        console.log(err)
        return res.send({
            statuscode: 500,
            error: err,
            message: "Error while creating cards"
        })
    }
}

exports.createBookingIdService = async function (req, res) {
    try {
        for (let i = 0; i <= 50000; i++) {
            let a = Math.ceil(Math.random() * 9900000000);
            let data = a.toString();
            if (data.length == 8) {
                const prefix = "98";
                let b = a.concat(prefix)
                console.log(b)
                // res.send(a)
                // User.insertMany({ bookingId: a }, { upsert: true })
            }
        }
        return res.send({
            statuscode: 200,
            data: null,
            message: "Booking IDs Created Successfully"
        })
    } catch (err) {
        console.log(err)
    }
}

exports.randomAlphaNumericString = async function (req, res) {
    try {
        const fnc = async function () {
            const data = Math.random().toString(36).slice(2)
            if (data.length === 10) {
                res.send({
                    data: [
                        data,
                        data.length
                    ]
                })
            } else {
                fnc();
            }
            console.log(data)
        }
        fnc();

    } catch (err) {
        console.log(err)
    }
}

