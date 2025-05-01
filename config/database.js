const mongoose = require("mongoose");
require("dotenv").config()

const dbConnect = () => {
	mongoose.connect(process.env.DATABASE_URL)
		.then((data) => {
			console.log("database connection is established successfully : ", data.connection.host)
		})
		.catch((error) => {
			console.log("error occured while connecting to database : ", error)
		})
}

module.exports = dbConnect;