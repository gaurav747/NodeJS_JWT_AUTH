
const jwt = require("jsonwebtoken");

exports.verifyJwt = async function (req, res, next) {
    try {
        const authheader = req.headers.authorization;
        console.log("+++++++++++++++++")
        if (authheader) {
            const tk = authheader.split(' ')[1];
            if ((authheader == "") || (authheader == null)) {
                return res.send({
                    statuscode: 401,
                    data: null,
                    message: "token is blank"
                })
            }
            try {
                var decoded = jwt.verify(tk, 'secretKey')
                var useridone = decoded.subjet;
                req.userid = useridone;
                next();
            } catch (err) {
                console.log(err)
                return res.send({
                    statuscode: 403,
                    data: err,
                    message: "Session Expired"
                })
            }
        } else {
            return res.send({
                statuscode: 401,
                data: null,
                message: "token is blank"
            })
        }

    } catch (error) {
        console.log(error)
        return res.send({
            statuscode: 401,
            error: error,
            message: "server error"
        })
    }
}

