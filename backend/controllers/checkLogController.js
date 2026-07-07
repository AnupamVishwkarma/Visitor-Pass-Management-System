const CheckLog = require('../models/CheckLog');
const Pass = require('../models/Pass');

const findValidPass = async (passNumber, res) => {
    const pass = await Pass.findOne({ passNumber });

    if(!pass){
        res.status(404).json({
            message : "Pass not found",
        });
        return null;
    }

    if(pass.status === "expired" || new Date() > pass.validTill){
        res.status(400).json({
            message : "Pass has expired",
        });
        return null;
    }

    return pass;
};

const checkInVisitor = async (req, res) => {
    try {
        const { passNumber} = req.body;

        const pass = await findValidPass(passNumber, res);
        if(!pass) return;

        const existingLog = await CheckLog.findOne({
            passId : pass._id,
            status : "checked-in",
        });

        if(existingLog) {
            return res.status(400).json({
                message : "Visitor is already checked in",
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

        const pass = await findValidPass(passNumber, res);
        if(!pass) return;

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
        pass.status = "expired";
        pass.validTill = new Date();

        await log.save();
        await pass.save();
        res.status(200).json(log);

    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

const scanPass = async (req, res) => {
    try{
        const {passNumber} = req.body;

        const pass = await findValidPass(passNumber, res);
        if(!pass) return;

        const activeLog = await CheckLog.findOne({
            passId : pass._id,
            status : "checked-in",
        });

        if(activeLog){
            activeLog.checkOutTime = new Date();
            activeLog.status = "checked-out";
            pass.status = "expired";
            pass.validTill = new Date();

            await activeLog.save();
            await pass.save();

            return res.status(200).json({
                action : "checkout",
                message : "Visitor Checked Out Successfully",
                log : activeLog,
            });
        }

        const log = await CheckLog.create({
            visitorId : pass.visitorId,
            passId : pass._id,
            checkInTime : new Date(),
            status : "checked-in",
        });

        return res.status(201).json({
            action : "checkin",
            message : "Visitor Checked In Successfully",
            log,
        });

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
        .populate("passId")
        .sort({createdAt: -1});

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
    scanPass,
    getLogs,
};
