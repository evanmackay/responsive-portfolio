const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

router.get("/index", (req, res) => {
    res.render("index");
});

router.get("/contact", (req, res) => {
    res.render("contact");
});

router.get("/portfolio", (req, res) => {
    res.render("portfolio");
});

router.post("/send", (req, res) => {
    console.log(req.body)
    const output = `
    <p>You have a new message.</p>
    <h3>Message Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email Address: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });
    let mailOptions = {
        from: 'rememberthembf@gmail.com',
        to: "evanmackay71@yahoo.com",
        subject: "Message From Portfolio Website :)",
        text: "New message from " + req.body.name,
        html: output
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Message sent");
            res.render("contact", {msg: "Your email has been sent."})
        }
    });
});

module.exports = router;