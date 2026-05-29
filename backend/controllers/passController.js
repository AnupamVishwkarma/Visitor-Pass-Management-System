const Pass = require("../models/Pass");
const Appointment = require("../models/Appointment");
const generateQR = require("../utils/generateQR");

const createPass = async (req, res) => {
    try {

        const appointment = await Appointment.findById(
            req.body.appointmentId
        );

        if (!appointment) {
            return res.status(404).json({
                message: "Appointment not found",
            });
        }

        const existingPass = await Pass.findOne({
            appointmentId: appointment._id,
        });

        if (existingPass) {
            return res.status(400).json({
                message: "Pass already exists",
            });
        }

        if (appointment.status !== "approved") {
            return res.status(400).json({
                message: "Appointment is not approved",
            });
        }

        const passNumber = "PASS-" + Date.now();

        const qrData = JSON.stringify({
            appointmentId: appointment._id,
            visitorId: appointment.visitorId,
            passNumber,
        });

        const qrCode = await generateQR(qrData);

        const pass = await Pass.create({
            visitorId: appointment.visitorId,
            appointmentId: appointment._id,
            passNumber,
            qrCode,
            validTill: appointment.visitDate,
        });

        res.status(201).json(pass);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: error.message,
        });

    }
};


const getPasses = async (req, res) => {
    try {
        const passes = await Pass.find()
            .populate("visitorId")
            .populate("appointmentId");

        res.status(200).json(passes);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createPass,
    getPasses,
};