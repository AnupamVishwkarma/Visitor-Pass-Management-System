const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
    },

    email: {
        type : String,
    },

    phone : {
        type : String,
        required : true,
    },

    address : {
        type : String,
    },

    photo: {
        type : String,
    },

    purpose : {
        type : String,
    },
},{timestamps : true});

module.exports = mongoose.model("Visitor", visitorSchema);