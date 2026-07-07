const express = require("express");

const {
    getUsers,
    createUser,
    deleteUser,
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/", protect, authorizeRoles("admin"), getUsers);
router.post("/", protect, authorizeRoles("admin"), createUser);
router.delete("/:id", protect, authorizeRoles("admin"), deleteUser);

module.exports = router;
