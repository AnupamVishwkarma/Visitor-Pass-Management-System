const express = require("express");

const {
    createVisitor,
    getVisitors,
} = require("../controllers/visitorController");

const protect = require("../middleware/authMiddleware");
const upload = require("../utils/upload");

const router = express.Router();

router.post("/", protect, upload.single("photo"), createVisitor);
router.get("/", protect, getVisitors);

module.exports = router;