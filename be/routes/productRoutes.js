const express = require("express");
const router = express.Router();
const parser = require("./cloudinary");
const Product = require("../models/productModel");
const cloudinary = require("cloudinary").v2;

router.get("/products", async (req, res) => {
	try {
		const { category, subcategory } = req.query;
		let query = {};

		if (category) {
			query.category = category;
		}
		if (subcategory) {
			query.subcategory = subcategory;
		}

		const products = await Product.find(query);
		res.json(products);
	} catch (error) {
		res.status(500).send("Server Error");
	}
});

router.get("/products/:id", async (req, res) => {
	try {
		const productId = req.params.id;
		const product = await Product.findById(productId);
		if (product) {
			res.status(200).json(product);
		} else {
			res.status(404).json({ message: "Prodotto non trovato" });
		}
	} catch (error) {
		console.error("Errore durante il recupero del prodotto:", error);
		res
			.status(500)
			.json({ message: "Errore durante il recupero del prodotto" });
	}
});

router.put("/products/:id", async (req, res) => {
	const productId = req.params.id;

	try {
		const existingProduct = await Product.findById(productId);
		if (!existingProduct) {
			return res.status(404).json({ message: "Prodotto non trovato" });
		}

		if (existingProduct.imageUrl !== req.body.imageUrl && req.body.imageUrl) {
			const publicId = existingProduct.imageUrl.split("/").slice(-2, -1)[0];
			await cloudinary.uploader.destroy(publicId);
		}

		const updatedProduct = await Product.findByIdAndUpdate(
			productId,
			req.body,
			{ new: true }
		);
		res.json({
			message: "Prodotto modificato con successo",
			product: updatedProduct,
		});
	} catch (error) {
		console.error("Errore durante la modifica del prodotto:", error);
		res
			.status(500)
			.json({ message: "Errore durante la modifica del prodotto" });
	}
});

router.post("/upload", parser.single("image"), (req, res) => {
	if (!req.file) {
		return res.status(500).json({ message: "Upload failed" });
	}
	res.json({ imageUrl: req.file.path });
});

router.post("/products", async (req, res) => {
	try {
		const newProduct = new Product(req.body);
		await newProduct.save();
		res
			.status(201)
			.json({ message: "Product added successfully", product: newProduct });
	} catch (error) {
		console.error("Error when creating new product:", error);
		if (error.name === "ValidationError") {
			console.error(error.errors);
		}
		res
			.status(500)
			.json({ message: "Failed to add product", error: error.message });
	}
});

router.delete("/products/:id", async (req, res) => {
	const productId = req.params.id;

	try {
		const deletedProduct = await Product.findByIdAndRemove(productId);

		if (!deletedProduct) {
			return res.status(404).json({ message: "Prodotto non trovato" });
		}

		res.json({ message: "Prodotto eliminato con successo" });
	} catch (error) {
		console.error("Errore durante l'eliminazione del prodotto:", error);
		res
			.status(500)
			.json({ message: "Errore durante l'eliminazione del prodotto" });
	}
});

router.delete("/delete-image", async (req, res) => {
	try {
		const imageUrl = req.body.imageUrl;
		const publicId = imageUrl.split("/").slice(-2, -1)[0];
		const result = await cloudinary.uploader.destroy(publicId);
		if (result.result === "ok") {
			res.status(200).send({ message: "Image deleted successfully" });
		} else {
			throw new Error("Failed to delete image");
		}
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
});

module.exports = router;
