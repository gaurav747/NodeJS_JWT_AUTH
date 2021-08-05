const registerUserService = require("../services/AuthenticatrionService");
const userLoginService = require("../services/AuthenticatrionService");
const getUserProfileService = require("../services/userProfileService");
const editUserProfileService = require("../services/userProfileService");
const deleteProfileService = require("../services/userProfileService");
const createBookingIdService = require("../services/userProfileService")

exports.registeruser = async function (req, res, next) {
    try {
        await registerUserService.registerUserService(req, res);
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};

exports.userLogin = async function (req, res, next) {
    try {
        var session = req.session.viewcount += 1
        console.log(session)
        await userLoginService.userLoginService(req, res);
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};

exports.getUserProfile = async function (req, res, next) {
    try {
        await getUserProfileService.getUserProfile(req, res);
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};

exports.editUserProfile = async function (req, res, next) {
    try {
        await editUserProfileService.editUserProfileService(req, res);
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};

exports.deleteProfile = async function (req, res, next) {
    try {
        await deleteProfileService.deleteProfileService(req, res);
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};

exports.createBookingId = async function (req, res, next) {
    try {
        await createBookingIdService.createBookingIdService(req, res);
    } catch (err) {
        return res.status(400).json({ status: 400, message: err.message });
    }
};


