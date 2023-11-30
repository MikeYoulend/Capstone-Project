const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const User = require("../models/user");

const verifyToken = (req, res, next) => {
	const authHeader = req.headers.authorization;
	console.log("Authorization Header:", authHeader); // Log dell'header di autorizzazione

	if (!authHeader) {
		return res
			.status(401)
			.json({ message: "Accesso negato. Nessun token fornito." });
	}

	const token = authHeader.split(" ")[1]; // Bearer TOKEN_STRING
	console.log("Token:", token); // Log del token

	if (!token) {
		return res.status(401).json({ message: "Token non presente." });
	}

	try {
		const verified = jwt.verify(token, process.env.JWT_KEY);
		console.log("Verified:", verified); // Log del risultato della verifica
		req.user = verified;
		next();
	} catch (error) {
		console.error("Errore di verifica del token:", error);
		res.status(400).json({ message: "Token non valido." });
	}
};

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

router.get("/profile", verifyToken, async (req, res) => {
	try {
		const userId = req.user.userId;
		const user = await User.findById(userId).select("-password"); // Escludi la password
		if (!user) {
			return res.status(404).json({ message: "Utente non trovato." });
		}
		res.json(user);
	} catch (error) {
		console.error("Errore durante la richiesta del profilo:", error);
		res.status(500).json({ message: "Errore interno del server." });
	}
});

// Route per aggiornare i dati del profilo
router.put("/profile", verifyToken, async (req, res) => {
	try {
		const userId = req.user.userId;
		const user = await User.findByIdAndUpdate(userId, req.body, {
			new: true,
		}).select("-password");
		res.json(user);
	} catch (error) {
		console.error("Errore durante l'aggiornamento del profilo:", error);
		res.status(500).json({ message: "Errore interno del server." });
	}
});

module.exports = router;
