const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("config");

const protectRoutes = async (req, res, next) => {
    // Get token from header
    const token = req.header("x-auth-token");

    if (!token) {
        res.status(401).json({ msg: "No token " });
    }
    try {
        // Verify token
        const decoded = jwt.verify(token, config.get("jwtSecret"));
        // Get user from the token
        req.user = await User.findById(decoded.id).select("-password");

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: "Token is not valid" });
    }
};
module.exports = { protectRoutes };
