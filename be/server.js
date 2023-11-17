const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const stripeRoutes = require("./routes/Stripe");

const server = express();
const port = 5050;

server.use(express.json());

server.use(cors());

server.use("/", productRoutes);
server.use("/auth", authRoutes);
server.use("/", stripeRoutes);

mongoose.connect(
	"mongodb+srv://mikeyoulend:dzgJb5KNuUbjwf1a@epiccluster.udtebk2.mongodb.net/",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "error during db connection"));
db.once("open", () => {
	console.log("Database successfully connected");
});

server.listen(port, () => {
	console.log("Server in esecuzione sulla porta: ", port);
});
