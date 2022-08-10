const express = require("express");
const router = express.Router();

//Register a user
//Public route
//POST api/users
router.post("/", (req, res) => {
    res.send("Register user");
});

module.exports = router;
