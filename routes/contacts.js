const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const { protectRoutes } = require("../middlware/auth");
const Contact = require("../models/Contact");

//  Register a user
//  Public route
//  GET api/contacts
router.get("/", protectRoutes, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1
        });
        res.json(contacts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//  Add new contact
//  Private route
//  POST api/contacts
router.post(
    "/",
    [protectRoutes, [body("name", "Please enter a name").not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, email, phone, type } = req.body;

            const newContact = new Contact({
                name,
                email,
                phone,
                type,
                user: req.user.id
            });
            const contact = await newContact.save();

            res.json(contact);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
);

//  Update new contact
//  Private route
//  PUT api/contacts/:id
router.put("/:id", protectRoutes, async (req, res) => {
    const { name, email, phone, type } = req.body;

    const contactField = {};
    if (name) contactField.name = name;
    if (email) contactField.email = email;
    if (phone) contactField.phone = phone;
    if (type) contactField.type = type;

    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: "Contact not found" });

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactField },
            { new: true }
        );
        res.json(contact);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

//  Delete new contact
//  Private route
//  POST api/contacts/:id
router.delete("/:id", protectRoutes, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        if (!contact) return res.status(404).json({ msg: "Contact not found" });

        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" });
        }
        await Contact.findByIdAndRemove(req.params.id);
        res.json({ msg: "Contact removed" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
