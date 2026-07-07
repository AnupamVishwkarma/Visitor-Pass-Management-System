const express = require("express");

const{
    exportVisitorsCSV,
    exportAppointmentsCSV,
    exportPassesCSV,
} = require("../controllers/reportController");

const protect = require("../middleware/authMiddleware");
const authorizedRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/visitors", protect, authorizedRoles("admin"), exportVisitorsCSV);
router.get("/appointments", protect, authorizedRoles("admin"), exportAppointmentsCSV);
router.get("/passes", protect, authorizedRoles("admin"), exportPassesCSV);

module.exports = router;
