const express = require("express");
const router = express.Router();

//  Register a user
//  Public route
//  GET api/contacts
router.get("/", (req, res) => {
    res.send("get all contacts");
});

//  Add new contact
//  Private route
//  POST api/contacts
router.post("/", (req, res) => {
    res.send("Add new contact");
});

//  Update new contact
//  Private route
//  PUT api/contacts/:id
router.put("/:id", (req, res) => {
    res.send("Update contact");
});

//  Delete new contact
//  Private route
//  POST api/contacts/:id
router.delete("/:id", (req, res) => {
    res.send("Delete contact");
});

module.exports = router;
