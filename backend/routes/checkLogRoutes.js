const express = require("express");

const {
    checkInVisitor,
    checkOutVisitor,
    getLogs,
} = require("../controllers/checkLogController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/checkin",  protect, authorizeRoles("security", "admin"),
checkInVisitor
);

router.post("/checkout", protect, authorizeRoles("security", "admin"), checkOutVisitor);

router.get("/", protect, authorizeRoles("admin", "security"), getLogs);

module.exports = router;