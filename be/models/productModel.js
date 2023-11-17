const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		enum: ["collezioni", "manga"],
		required: true,
	},
	subcategory: {
		type: String,
		enum: ["Pokemon", "Yugiho", "one piece", "dragonball"],
		required: false,
	},
});

module.exports = mongoose.model("Product", productSchema);
