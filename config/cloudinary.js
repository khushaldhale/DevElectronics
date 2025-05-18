const cloudinary = require("cloudinary").v2;
require("dotenv").config()

const cloudinaryConnect = async () => {

	cloudinary.config({
		cloud_name: process.env.CLOUD_NAME,
		api_key: process.env.API_KEY,
		api_secret: process.env.API_SECRET
	})

	try {

		await cloudinary.api.ping();
		console.log("connected to cloduinary successfully  ")
	}
	catch (error) {
		console.log("error occured  while connecting to cloudinary : ", error)
	}

}

module.exports = cloudinaryConnect; 