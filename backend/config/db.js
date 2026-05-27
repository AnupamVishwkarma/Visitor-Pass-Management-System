const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("Database Connection Error:", error);

        if (error.code === 'ECONNREFUSED' && error.syscall === 'querySrv') {
            console.error(
                "MongoDB SRV lookup failed. This usually means DNS/SRV resolution is blocked or the network cannot reach MongoDB Atlas.",
            );
            console.error(
                "Try using a standard mongodb:// connection string or verify your DNS/network settings and Atlas IP access list.",
            );
        }

        process.exit(1);
    }
};

module.exports = connectDB;