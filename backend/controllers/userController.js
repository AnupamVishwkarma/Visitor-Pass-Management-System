const bcrypt = require("bcryptjs");
const User = require("../models/User");

const getUsers = async (req, res) => {
    try{
        const users = await User.find().select("-password").sort({
            createdAt : -1,
        });

        res.status(200).json(users);
    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

const createUser = async (req, res) => {
    try{
        const {name, email, password, role} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message : "User already exists",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password : hashPassword,
            role,
        });

        const safeUser = user.toObject();
        delete safeUser.password;

        res.status(201).json(safeUser);
    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

const deleteUser = async (req, res) => {
    try{
        if(req.user._id.toString() === req.params.id){
            return res.status(400).json({
                message : "You cannot delete your own account",
            });
        }

        const user = await User.findByIdAndDelete(req.params.id);

        if(!user){
            return res.status(404).json({
                message : "User not found",
            });
        }

        res.status(200).json({
            message : "User deleted successfully",
        });
    }catch(error){
        res.status(500).json({
            message : error.message,
        });
    }
};

module.exports = {
    getUsers,
    createUser,
    deleteUser,
};
