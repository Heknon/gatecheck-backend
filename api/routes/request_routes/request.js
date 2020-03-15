const express = require('express');
const moment = require('moment');
const mongoose = require('mongoose');
const router = express.Router();
const {
    Request,
    Student
} = require('../../models/index');
const checkAuth = require('../../middleware/check-auth');

router.get("/request/:requestId", checkAuth, async (req, res) => {
    const request = await Request.findById(req.params.requestId);
    if (request === null) {
        return res.status(404).json({
            success: false,
            message: "Invalid resource ID"
        });
    }

    if (request.issuer === req.userData.userId) {
        res.status(200).json({
            success: true,
            message: "Found resource",
            request
        });
    } else {
        res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

});

router.post("/request", checkAuth, async (req, res) => {
    const user = await Student.findById(req.userData.userId).exec();
    if (user === null) {
        return res.status(401).json({
            success: false,
            message: "You must be logged in to perform this action!"
        });
    }
    const {
        details,
        reason,
        title,
        type,
        goLocation
    } = req.body;
    const request = new Request({
        _id: new mongoose.SchemaTypes.ObjectId(),
        accepted: false,
        accepted: null,
        details,
        issuedDate: moment.now(),
        issuer: user,
        reason,
        title,
        type,
        validTill: moment().add(moment.duration({
            day: 1
        })).get(),
        goLocation,
        backAtSchoolTime: null
    });

    request.save().then(doc => {
        res.status(201).json({
            success: true,
            message: "Created request!",
            request
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Failed to save resource",
            error: err
        });
    });

});



module.exports = router;