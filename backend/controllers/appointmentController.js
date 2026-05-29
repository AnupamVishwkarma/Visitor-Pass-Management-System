const Appointment = require("../models/Appointment");

const createAppointment = async (req, res) => {
    try{
        const appointment = await Appointment.create({
            visitorId : req.body.visitorId,
            hostId : req.body.hostId,
            purpose : req.body.purpose,
            visitDate : req.body.visitDate,
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
        );

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
        );

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