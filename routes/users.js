const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

//Register a user
//Public route
//POST api/users
router.post(
    "/",
    body("name", "Please enter a name").not().isEmpty(),
    body("email", "Please enter a valid email").isEmail(),

    body(
        "password",
        "Please enter a valid password with 5 or more characters"
    ).isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            //Checking is user exist
            let user = await User.findOne({ email });
            if (user) {
                res.status(400).json({ message: "User already exist" });
            }
            user = new User({
                name,
                email,
                password
            });

            //bcrypt a password
            const salt = await bcrypt.genSalt(8);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            res.status(201).json({
                token: generateToken(user._id)
            });

            res.send("User saved");
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
