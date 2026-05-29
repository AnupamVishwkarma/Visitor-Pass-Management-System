const express = require('express');

const{
    createPass,
    getPasses,
} = require('../controllers/passController');

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createPass);
router.get("/", protect, getPasses);

module.exports = router;