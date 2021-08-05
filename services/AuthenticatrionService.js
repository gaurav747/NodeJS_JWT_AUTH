const User = require("../db/models/userRegistrationModel")
const jwt = require("jsonwebtoken");




exports.registerUserService = async function (req, res) {
    try {
        const input = req.body;
        let user;
        const query =
            input.email && input.mobile
                ? { $or: [{ mobile: input.mobile }, { email: input.email }] }
                : input.email
                    ? { email: input.email }
                    : input.mobile
                        ? { mobile: input.mobile }
                        : null;

        if (!input.mobile || !input.email || !input.password || !input.fullname || input.email == "" || input.password == "" || input.fullname == "" || input.mobile == "") {
            return res.send({
                statuscode: 401,
                data: null,
                message: "Mandatory details missing"

            })
        }
        if (query != null) {
            user = await User.findOne(query);
        }
        if (user && user.isactive !== 2) {
            if (input.mobile == user.mobile && input.mobile) {
                return res.send({
                    statuscode: 401,
                    data: null,
                    message: "Mobile already exists"

                })
            } else if (input.email && input.email == user.email) {
                return res.send({
                    statuscode: 401,
                    data: null,
                    message: "Email already exists"

                })
            } else if (user.isActive == 0) {
                return res.send({
                    statuscode: 401,
                    data: null,
                    message: "Account is disabled"

                })
            } else {
                return res.send({
                    statuscode: 401,
                    data: null,
                    message: "Unaithorised Access"

                })
            }
        } else {
            const model = new User();
            model.userid = model._id;
            model.fullname = input.fullname;
            model.mobile = input.mobile,
                model.email = input.email,
                model.password = input.password;
            // Saving user to DB.

            model.save((error) => {
                if (error) {
                    console.log(error);
                    return res.send({
                        statuscode: 500,
                        data: null,
                        message: "Server error."
                    })
                } else {
                    return res.send({
                        statuscode: 200,
                        data: null,
                        message: "User Registered successfully"

                    })
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(404).send("error")
    }
};

exports.userLoginService = async function (req, res) {
    try {
        const input = req.body;
        if (!input.type || !input.password || input.type == "" || input.password == "") {
            return res.send({
                statuscode: 401,
                data: null,
                message: "provide valid type",
            });
        } else if ((input.type == "mobile") && (input.username !== "" || input.password !== "")) {
            User.findOne({ $and: [{ mobile: input.username }, { password: input.password }] }, (err, user) => {
                if (err) {
                    console.log(err)
                } else if (user) {
                    let payload = { subjet: user._id };
                    let token = jwt.sign(payload, "secretKey", {
                        // expiresIn: "10h" // it will be expired after 10 hours
                        //expiresIn: "20d" // it will be expired after 20 days
                        // expiresIn: 120 // it will be expired after 120ms
                        expiresIn: "10" // it will be expired after 120s
                    });

                    // var myHeaders = new Headers();
                    // myHeaders.append('Authorization', `Bearer ${token}`);
                    // myHeaders.append('Content-Type', 'application/json');
                    // myHeaders.set('Content-Type', 'text/html');
                    // let options = new RequestOptions({ headers: myHeaders });
                    // return res.status(200).setHeader('Set-Cookie', ['type=ninja', 'language=javascript']).setHeader('X-Foo', 'bar')
                    //     .send({
                    //         statuscode: 200,
                    //         data: token,
                    //         message: "User Logged in Successfully",
                    //     });
                    return res.setHeader('Authorization', `Bearer ${token}`)
                } else if (!user) {
                    return res.send({
                        statuscode: 401,
                        data: null,
                        message: "Wrong Credentials",
                    });
                }
            })




        } else if ((input.type == "email") && (input.username !== "" || input.password !== "")) {
            User.findOne({ $and: [{ email: input.username }, { password: input.password }] }, (err, user) => {
                if (err) {
                    console.log(err)
                } else if (user) {
                    let payload = { subjet: user._id };
                    let token = jwt.sign(payload, "secretKey", {
                        // expiresIn: "10h" // it will be expired after 10 hours
                        //expiresIn: "20d" // it will be expired after 20 days
                        expiresIn: 120 // it will be expired after 120ms
                        //expiresIn: "120s" // it will be expired after 120s
                    });
                    return res.status(200).send({
                        statuscode: 200,
                        data: token,
                        message: "User Logged in Successfully",
                    });
                } else if (!user) {
                    return res.send({
                        statuscode: 401,
                        data: null,
                        message: "Wrong credentials",
                    });
                }
            })
        } else {
            return res.send({
                statuscode: 500,
                data: null,
                message: "provide valid parameters",
            });
        }
    } catch (error) {
        console.log(error)
    }
}

