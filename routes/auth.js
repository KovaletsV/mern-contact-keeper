const express = require("express");
const router = express.Router();

//  Get logged a user
//  Private route
//  GET api/auth
router.get("/", (req, res) => {
    res.send("Get logged user");
});

//  Auth user and get token
//  Public route
//  POST api/auth
router.post("/", (req, res) => {
    res.send("Login user");
});

module.exports = router;
