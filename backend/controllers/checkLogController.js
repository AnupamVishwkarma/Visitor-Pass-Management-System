const CheckLog = require('../models/CheckLog');
const Pass = require('../models/Pass');

const checkInVisitor = async (req, res) => {
    try {
        const { passNumber} = req.body;

        const pass = await Pass.findOne({ passNumber});

        if(!pass){
            return res.status(404).json({
                message : "Pass not found",
            });
        }

        const existingLog = await CheckLog.findOne({
            passId : pass._id,
            status : "checked-in",
        });

        if(existingLog) {
            return res.status(400).json({
                message : "Visitor is already checked in",
            });
        }

        if(new Date() > pass.validTill){
            return res.status(400).json({
                message : "Pass has expired",
            });
        }

        const log = await CheckLog.create({
            visitorId : pass.visitorId,
            passId : pass._id,
            checkInTime : new Date(),
            status : "checked-in",
        });

        res.status(201).json(log);
    }catch (error){
        res.status(500).json({
            message : error.message,
        });
    }
};

const checkOutVisitor = async (req, res) => {
    try{
        const {passNumber} = req.body;

        const pass = await Pass.findOne({passNumber});

        if(!pass){
            return res.status(404).json({
                message : "Pass not found",
            });
        }

        const log = await CheckLog.findOne({
            passId : pass._id,
            status : "checked-in",
        });

        if(!log){
            return res.status(400).json({
                message : "No active check-in found",
            });
        }

        log.checkOutTime = new Date();
        log.status = "checked-out";

        await log.save();
        res.status(200).json(log);

    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

const getLogs = async (req, res) => {
    try{
        const logs = await CheckLog.find()
        .populate("visitorId")
        .populate("passId");

        res.status(200).json(logs);
    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

module.exports = {
    checkInVisitor,
    checkOutVisitor,
    getLogs,
};