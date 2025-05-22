const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
	counter: {
		type: Number,
		default: 0
	}
})

module.exports = mongoose.model("COUNTER", counterSchema)