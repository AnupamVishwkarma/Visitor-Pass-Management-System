const Visitor = require("../models/Visitor");

const createVisitor = async (req, res) => {
    try{
        const visitor = await Visitor.create({
            name  : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            address : req.body.address,
            purpose : req.body.purpose,
            photo : req.file ? req.file.path : "",
        });

        res.status(201).json(visitor);
    }catch(error){
        res.status(500).json({
           message : error.message,
        });
    }
};

const getVisitors = async (req, res) => {
    try{
        const visitors = await Visitor.find();

        res.status(200).json(visitors);

    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

module.exports = {
    createVisitor,
    getVisitors,
};