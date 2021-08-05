const expresss = require("express");
const http = require("http")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/config")
const routes = require("./routes/routes")
const session = require("express-session")
const app = expresss();
app.use(cors());
app.use(bodyParser.json());


//===============================  create server  =====================
// try {
//     console.log("++++++++++++++++++++++++++++++")
//     http.createServer(function (req, res) {
//         console.log(req)

//         app.listen(config.app.port, function () {
//             console.log("Server Listeming on Port" + config.app.port);
//             app.use(session({
//                 secret: "data8899@#",
//                 resave: false,
//                 saveUninitialized: false
//             }))
//         });
//     });
// } catch (error) {
//     console.log(error)
// }
//  ===================================================================

// Server is listening on Port 3000.
app.listen(config.app.port, function () {
    console.log("Server Listeming on Port" + config.app.port);
    app.use(session({
        secret: "data8899@#",
        resave: false,
        saveUninitialized: false
    }))
});

app.use(session({
    secret: "data8899@#",
    resave: false,
    saveUninitialized: false
}))

app.use('/', routes)











