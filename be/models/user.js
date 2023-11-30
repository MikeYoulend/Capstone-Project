const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	username: { type: String, required: false },
	password: { type: String, required: true },
	fullName: { type: String, required: false },
	address: { type: String, required: false },
	gender: {
		type: String,
		enum: ["male", "female", "unspecified"],
		default: "unspecified",
	},
	phoneNumber: { type: String, required: false },
	profileImage: { type: String, required: false },
});

userSchema.methods.comparePassword = function (candidatePassword) {
	return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
