const express = require("express");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/profile", protect, (req, res) =>{
    res.json({
        message: "Protected Profile Route",
        user: req.user,
    });
});

router.get("/admin", protect, authorizeRoles("admin"), (req, res) => {
    res.json({
        message: "Admin Route",
        user: req.user,
    });
});

module.exports = router;