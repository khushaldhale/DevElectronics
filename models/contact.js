const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
	{
		fname: {
			type: String,
			required: [true, "Fname is required"],
			trim: true
		},
		lname: {
			type: String,
			required: [true, "Lname is required"],
			trim: true
		},
		email: {
			type: String,
			required: [true, "Email  is required"]
		},
		contact: {
			type: Number,
			required: [true, "Contact is required"]
		},
		subject: {
			type: String,
			required: [true, "Subject is required"]
		},
		message: {
			type: String,
			required: [true, 'Message is required']
		}
	}
)

module.exports = mongoose.model("CONTACT", contactSchema)