const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const VerifyToken = require("../Middleware/VerifyToken");

route.post("/register", async (req, res) => {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(400).json({ message: "user already exits" });
    }

    const hashedpass = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedpass,
        role: role || "user",
    });

    await newUser.save();

    res.status(200).json({
        message: "rak nadi",
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
    });
});

route.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "had email makaynch" });
        }

        const passwwordMatch = await bcrypt.compare(password, user.password);
        if (!passwwordMatch) {
            return res.status(400).json({ message: "had password makhdamch" });
        }

        const token = jwt.sign(
            {
                userId: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
            process.env.JWT,
            { expiresIn: "30d" }
        );

        res.cookie("token", token, {
            httpOnly: false,
            maxAge: 30 * 24 * 60 * 60,
            path: "/",
            credentials: true,
        });

        res.status(200).json({
            message: "login successfuly",
            token,
            user: {
                email: user.email,
                username: user.username,
                id: user._id,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


route.get("/currentuser", VerifyToken, async (req, res) => {
    try{
        const user = req.user;

        res.status(200).json({
            user:{
                username:user.username,
                email:user.email,
                id:user._id
            }
        })
    }catch(er){
        res.json({message:er.message})
    }
})


module.exports = route;
