const express = require("express");
const router = express.Router();
require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/pay", async (req, res) => {
	try {
		const { amount, id } = req.body;
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "EUR",
			description: "Descrizione del pagamento",
			payment_method: id,
			confirm: true,
			return_url: "http://localhost:3000/cart",
		});
		console.log(payment);
		res.send({ message: "Pagamento riuscito", success: true });
	} catch (error) {
		console.error("Errore nel pagamento:", error);
		res.json({ message: "Pagamento fallito", success: false });
	}
});

module.exports = router;
