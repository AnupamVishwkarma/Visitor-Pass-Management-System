const mongoose = require("mongoose");

const CheckLogSchema = new mongoose.Schema({
    visitorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Visitor",
        required : true,
    },

    passId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Pass",
        required : true,
    },

    checkInTime : {
        type : Date,
    },

    checkOutTime : {
        type : Date,
    },

    status : {
        type : String,
        enum : ["checked-in", "checked-out"],
        default : "checked-in",
    },
},
{
    timestamps : true,
}
);

module.exports = mongoose.model("CheckLog", CheckLogSchema);