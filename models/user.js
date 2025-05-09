const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
	fname: {
		type: String,
		required: [true, "Fname is required"],
		trim: true,
		lowercase: true
	},
	lname: {
		type: String,
		required: true,
		trim: true,
		lowercase: true
	},
	email: {
		type: String,
		required: [true, "Email is required "]
	},
	password: {
		type: String,
		required: [true, "Password is required"],
		min: [8, "Minimum 8 characters are required"]
	},
	accountType: {
		type: String,
		enum: ["admin", "user"],
		default: "admin"

	},
	categories: {
		type: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "CATEGORY"
			}
		]
	}
},
	{
		timestamps: true
	})

module.exports = mongoose.model("USER", userSchema);