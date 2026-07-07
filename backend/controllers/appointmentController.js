const Appointment = require("../models/Appointment");
const Visitor = require("../models/Visitor");
const sendEmail = require("../utils/sendEmail");

const createAppointment = async (req, res) => {
    try{
        const appointment = await Appointment.create({
            visitorId : req.body.visitorId,
            hostId : req.user._id,
            purpose : req.body.purpose,
            visitDate : req.body.visitDate,
        });

        const visitor = await Visitor.findById(req.body.visitorId);

        await sendEmail({
            to : visitor?.email,
            subject : "Appointment Created",
            text : `Your appointment for ${appointment.purpose} is created for ${appointment.visitDate}.`,
        });

        res.status(201).json(appointment);

    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

const getAppointments = async (req, res) => {
    try{
        const appointments = await Appointment.find()
        .populate("visitorId")
        .populate("hostId", "name email role");

        res.status(200).json(appointments);
    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

const approveAppointment = async (req, res) => {
    try{
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            {
                status : "approved",
            },
            {new : true}
        ).populate("visitorId");

        if(!appointment){
            return res.status(404).json({
                message : "Appointment not found",
            });
        }

        await sendEmail({
            to : appointment.visitorId?.email,
            subject : "Appointment Approved",
            text : `Your appointment for ${appointment.purpose} has been approved.`,
        });

        res.status(200).json(appointment);
    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

const rejectAppointment = async (req, res) => {
    try{
        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            {
                status : "rejected",
            },
            {new : true}
        ).populate("visitorId");

        if(!appointment){
            return res.status(404).json({
                message : "Appointment not found",
            });
        }

        await sendEmail({
            to : appointment.visitorId?.email,
            subject : "Appointment Rejected",
            text : `Your appointment for ${appointment.purpose} has been rejected.`,
        });

        res.status(200).json(appointment);
    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

module.exports = {
    createAppointment,
    getAppointments,
    approveAppointment,
    rejectAppointment,
};
