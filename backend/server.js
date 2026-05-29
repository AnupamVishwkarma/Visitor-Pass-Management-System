const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/test", require("./routes/testRoutes"));
app.use("/api/visitors", require("./routes/visitorRoutes"));

app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/passes", require("./routes/passRoutes"));
app.use("/api/checklogs", require("./routes/checkLogRoutes"));

app.get("/", (req, res) => {
    res.send("Visitor Pass API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});