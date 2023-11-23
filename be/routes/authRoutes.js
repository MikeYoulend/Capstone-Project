const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/user");

router.post("/register", async (req, res) => {
	try {
		const { email, username, password } = req.body;

		let user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "L'utente esiste già." });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		user = new User({
			email,
			username,
			password: hashedPassword,
		});

		await user.save();
		res.status(201).json({ message: "Utente registrato con successo!" });
	} catch (error) {
		console.error("Errore durante la registrazione:", error);
		res.status(500).json({ message: "Errore durante la registrazione." });
	}
});

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).send("Email or password is wrong.");
		}

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).send("Email or password is wrong.");
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
			expiresIn: "1h",
		});

		res.send({ token, username: user.username }); // Invia anche lo username
	} catch (error) {
		console.error("Login error:", error);
		res.status(500).send("An error occurred during login.");
	}
});

module.exports = router;
