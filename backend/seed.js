const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");
const User = require("./models/User");
const Visitor = require("./models/Visitor");
const Appointment = require("./models/Appointment");
const Pass = require("./models/Pass");
const CheckLog = require("./models/CheckLog");

dotenv.config();

const seed = async () => {
    await connectDB();

    await CheckLog.deleteMany();
    await Pass.deleteMany();
    await Appointment.deleteMany();
    await Visitor.deleteMany();
    await User.deleteMany();

    const password = await bcrypt.hash("password123", 10);

    const [admin, security, employee, visitorUser] = await User.create([
        {
            name : "Admin User",
            email : "admin@example.com",
            password,
            role : "admin",
        },
        {
            name : "Security User",
            email : "security@example.com",
            password,
            role : "security",
        },
        {
            name : "Employee Host",
            email : "employee@example.com",
            password,
            role : "employee",
        },
        {
            name : "Visitor User",
            email : "visitor@example.com",
            password,
            role : "visitor",
        },
    ]);

    const [visitor] = await Visitor.create([
        {
            name : "Rahul Sharma",
            email : "rahul@example.com",
            phone : "9876543210",
            address : "Mumbai",
            purpose : "Client Meeting",
        },
    ]);

    await Appointment.create({
        visitorId : visitor._id,
        hostId : employee._id,
        purpose : "Client Meeting",
        visitDate : new Date(),
        status : "approved",
    });

    console.log("Seed data created");
    console.log("Admin:", admin.email, "password123");
    console.log("Security:", security.email, "password123");
    console.log("Employee:", employee.email, "password123");
    console.log("Visitor:", visitorUser.email, "password123");

    process.exit(0);
};

seed().catch((error) => {
    console.error(error);
    process.exit(1);
});
