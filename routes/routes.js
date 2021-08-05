const Router = require("express");
const router = require("express").Router();
const controller = require("../controller/controller");
const jwtHandler = require("../middlewares/JwtHandler")

router.post("/register", controller.registeruser);
router.post("/login", controller.userLogin);
router.get("/getuser", jwtHandler.verifyJwt, controller.getUserProfile);
router.post("/edituser", jwtHandler.verifyJwt, controller.editUserProfile);
router.delete("/deleteuser", jwtHandler.verifyJwt, controller.deleteProfile);


module.exports = router;