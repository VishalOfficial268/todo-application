const UserModel = require('../model/User');
const dotenv = require('dotenv');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
SECRET_KEY = "sshhh!!itssecretofvishal###lol"

const signup = async (req, res, next) => {
    const body = req.body;
    const { email, password } = body;
    try {
        const emailExists = await UserModel.findOne({ email: body.email });
        if (emailExists) return res.status(400).json("Email already exists");
        const hashedPassword = await bcrypt.hash(password, 10);
        body.password = hashedPassword;
        const user = new UserModel(body);
        const savedUser = await user.save();
        const token = jwt.sign({ id: savedUser._id, email: email }, SECRET_KEY);
        console.log("user data saved successfully...");
        return res.status(200).json({ user: savedUser, token: token })
    } catch (error) {
        next(error);
    }
}


const login = async (req, res, next) => {
    try {
        let { email, password } = req.body;
        if (email && password) {
            const existingUser = await UserModel.findOne({ email });
            if (!existingUser) {
                return res.status(400).json({ message: "user not found" });
            }

            const matchPassword = await bcrypt.compare(password, existingUser.password);
            if (!matchPassword) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, SECRET_KEY);
            return res.status(201).json({ user: existingUser, token: token })

        } else {
            console.log("email & password are required.")
            return res.status(400).json({ message: "email & password are required." });
        }
    } catch (error) {
        next(error);
    }
}



module.exports = {
    signup,
    login,
}