const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../models/User");
const { protectRoutes } = require("../middlware/auth");

//  Get logged a user
//  Private route
//  GET api/auth
router.get("/", protectRoutes, (req, res) => {
    try {
        res.status(201).json(req.user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error");
    }
});

//  Auth user and get token
//  Public route
//  POST api/auth
router.post(
    "/",
    body("email", "Please enter a valid email").isEmail(),

    body("password", "Please enter a valid password ").exists(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({ msg: "Invalid email" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid password" });
            }
            res.status(201).json({ token: generateToken(user._id) });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server error");
        }
    }
);

const generateToken = id => {
    return jwt.sign({ id }, config.get("jwtSecret"), {
        expiresIn: "24H"
    });
};
module.exports = router;
