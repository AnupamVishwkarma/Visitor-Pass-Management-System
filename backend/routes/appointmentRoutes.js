const express = require("express");

const {
    createAppointment,
    getAppointments,
    approveAppointment,
    rejectAppointment,
} = require("../controllers/appointmentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, createAppointment);
router.get("/", protect, getAppointments);
router.put("/approve/:id", protect, authorizeRoles("admin", "employee"), approveAppointment);
router.put("/reject/:id", protect, authorizeRoles("admin", "employee"), rejectAppointment);

module.exports = router;