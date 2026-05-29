const express = require("express");

const{
    exportVisitorsCSV,
} = require("../controllers/reportController");

const protect = require("../middleware/authMiddleware");
const authorizedRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/visitors", protect, authorizedRoles("admin"), exportVisitorsCSV);

module.exports = router;