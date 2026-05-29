const Visitor = require("../models/Visitor");
const Appointment = require("../models/Appointment");
const Pass = require("../models/Pass");
const CheckLog = require("../models/CheckLog");

const getDashboardStats = async (req, res) => {
    try {
        const totalVisitors = await Visitor.countDocuments();
        const pendingAppointments = await Appointment.countDocuments({
            status : "pending",
        });

        const approvedAppointments = await Appointment.countDocuments({
            status : "approved",
        });

        const totalPasses = await Pass.countDocuments();

        const activePasses = await Pass.countDocuments({
            status : "active",
        });

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const todayCheckIns = await CheckLog.countDocuments({
            checkInTime : { $gte : today, },
        });

        res.status(200).json({
            totalVisitors,
            pendingAppointments,
            approvedAppointments,
            totalPasses,
            todayCheckIns,
            activePasses,
        });
    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

module.exports = {
    getDashboardStats,
};