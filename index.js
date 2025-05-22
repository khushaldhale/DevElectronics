const express = require("express");
const app = express();
const mongoose = require("mongoose")
require("dotenv").config()
const fileUpload = require("express-fileupload");
const cookies = require("cookie-parser");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit")

app.set('trust proxy', 1);
app.use(express.json());
app.use(fileUpload({
	tempFileDir: "/temp/",
	useTempFiles: true
}))
app.use(cookies())
app.use(cors({
	origin: ["http://localhost:5173", "http://develectronics.shop", "http://localhost:4173", "https://develectronics.shop", "https://www.develectronics.shop", "http://www.develectronics.shop", "http://64.227.132.210.shop", "https://64.227.132.210.shop"],
	credentials: true

}))
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 150, // Limit each IP to 100 requests per windowMs
	statusCode: 429, // HTTP status code for Too Many Requests
	message: {
		status: 429,
		error: "Too many requests. Please try again after 15 minutes."
	}
});

app.get("/", (req, res) => {
	return res.status(200)
		.json({
			success: true,
			message: "server is up and running "
		})
})

const dbConnect = require("./config/database");
dbConnect()

const cloudinaryConnect = require("./config/cloudinary");
cloudinaryConnect()

// auth  limiter is applied to auth routes only 
const authRoutes = require("./routes/authRoutes");
app.use("/api/v1/auth", rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 30, // Limit each IP to 100 requests per windowMs
	statusCode: 429, // HTTP status code for Too Many Requests
	message: {
		status: 429,
		error: "Too many requests. Please try again after 15 minutes."
	}
}), authRoutes);

// This is global limiter applied to the further routes only 
app.use(limiter);


const itemRoutes = require("./routes/itemRoutes");
app.use("/api/v1/items", itemRoutes)

const shopRoutes = require("./routes/shopRoutes");
app.use("/api/v1/shops", shopRoutes);

const billRoutes = require("./routes/billRoutes");
app.use("/api/v1/bills", billRoutes);

const contactRoutes = require("./routes/contactRoutes");
app.use("/api/v1/contacts", contactRoutes);

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/v1/categories", categoryRoutes);

const companyRoutes = require("./routes/companyRoutes");
app.use("/api/v1/companies", companyRoutes);

const { createCounter } = require("./controllers/counter");
app.post("/api/v1/counter", createCounter);

// 404 Handler
app.use((req, res) => {
	return res.status(404).json({
		success: false,
		message: "Route not found"
	});
});

app.use((error, req, res, next) => {

	console.log("error occured : ", error);

	const statusCode = error.statusCode || 500;
	let errorMessage = error.message || "Internal errror occured";

	if (error.name === "ValidationError") {
		errorMessage = Object.values(error.errors).map((error) => {
			return error.message;
		})
	}

	return res.status(statusCode)
		.json({
			success: false,
			message: errorMessage
		})
})

const PORT = process.env.PORT || 4001;
const server = app.listen(PORT, () => {
	console.log("server is listening at : ", PORT)
})

const serverClose = () => {
	server.close((error) => {
		if (error) {
			console.log("errror occured  while closing downn the server : ");
			process.exit(1)
		}


		mongoose.connection.close(false)
			.then((data) => {
				console.log("database connection is closed successfully : ");
				process.exit(0)
			})
			.catch((error) => {
				console.log("error occured while shutting down the database : ");
				process.exit(1)
			})

	})
}

process.on("SIGINT", serverClose);
process.on("SIGTERM", serverClose); 
