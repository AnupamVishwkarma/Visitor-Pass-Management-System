const {Parser} = require("json2csv");
const Visitor = require("../models/Visitor");

const exportVisitorsCSV = async (req, res) => {
    try{
        const visitors = await Visitor.find();

        const fields = ["name", "email", "phone", "purpose"];

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

module.exports = {exportVisitorsCSV,};