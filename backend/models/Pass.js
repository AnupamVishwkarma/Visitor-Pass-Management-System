const mongoose = require("mongoose");

const passSchema = new mongoose.Schema({
    visitorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "visitor",
        required : true,
    },

    appointmentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Appointment",
        required : true,
    },

    passNumber : {
        type : String,
        unique : true,
        required : true,
    },

    qrCode : {
        type : String,
    },

    validTill : {
        type : Date,
        required : true,
    },

    status : {
        type : String,
        enum : ["active", "expired"],
        default : "active",
    },
},
{
    timestamps : true,
}

);

module.exports = mongoose.model("Pass", passSchema);