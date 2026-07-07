const {Parser} = require("json2csv");
const Visitor = require("../models/Visitor");
const Appointment = require("../models/Appointment");
const Pass = require("../models/Pass");

const buildTextFilter = (query, fields) => {
    if(!query){
        return {};
    }

    const regex = new RegExp(query, "i");

    return {
        $or : fields.map((field) => ({
            [field] : regex,
        })),
    };
};

const exportVisitorsCSV = async (req, res) => {
    try{
        const visitors = await Visitor.find(
            buildTextFilter(req.query.search, [
                "name",
                "email",
                "phone",
                "purpose",
                "address",
            ])
        );

        const fields = ["name", "email", "phone", "address", "purpose", "photo"];

        const parser = new Parser({fields});
        const csv = parser.parse(visitors);

        res.header("Content-Type", "text/csv");

        res.attachment("visitors.csv");
        return res.send(csv);
    }catch (error){
        res.status(500).json({
            message : error.message,
        });
    }
};

const exportAppointmentsCSV = async (req, res) => {
    try{
        const filter = {};

        if(req.query.status){
            filter.status = req.query.status;
        }

        if(req.query.from || req.query.to){
            filter.visitDate = {};

            if(req.query.from){
                filter.visitDate.$gte = new Date(req.query.from);
            }

            if(req.query.to){
                const toDate = new Date(req.query.to);
                toDate.setHours(23, 59, 59, 999);
                filter.visitDate.$lte = toDate;
            }
        }

        const appointments = await Appointment.find(filter)
        .populate("visitorId", "name email phone")
        .populate("hostId", "name email role");

        const rows = appointments.map((appointment) => ({
            visitorName : appointment.visitorId?.name || "",
            visitorEmail : appointment.visitorId?.email || "",
            hostName : appointment.hostId?.name || "",
            hostEmail : appointment.hostId?.email || "",
            purpose : appointment.purpose,
            visitDate : appointment.visitDate,
            status : appointment.status,
        }));

        const parser = new Parser({
            fields : [
                "visitorName",
                "visitorEmail",
                "hostName",
                "hostEmail",
                "purpose",
                "visitDate",
                "status",
            ],
        });

        res.header("Content-Type", "text/csv");
        res.attachment("appointments.csv");
        return res.send(parser.parse(rows));
    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

const exportPassesCSV = async (req, res) => {
    try{
        const filter = {};

        if(req.query.status){
            filter.status = req.query.status;
        }

        const passes = await Pass.find(filter)
        .populate("visitorId", "name email phone")
        .populate("appointmentId", "purpose visitDate status");

        const rows = passes.map((pass) => ({
            visitorName : pass.visitorId?.name || "",
            visitorEmail : pass.visitorId?.email || "",
            passNumber : pass.passNumber,
            passStatus : pass.status,
            validTill : pass.validTill,
            appointmentPurpose : pass.appointmentId?.purpose || "",
            appointmentDate : pass.appointmentId?.visitDate || "",
            pdfUrl : pass.pdfUrl || "",
        }));

        const parser = new Parser({
            fields : [
                "visitorName",
                "visitorEmail",
                "passNumber",
                "passStatus",
                "validTill",
                "appointmentPurpose",
                "appointmentDate",
                "pdfUrl",
            ],
        });

        res.header("Content-Type", "text/csv");
        res.attachment("passes.csv");
        return res.send(parser.parse(rows));
    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

module.exports = {
    exportVisitorsCSV,
    exportAppointmentsCSV,
    exportPassesCSV,
};
