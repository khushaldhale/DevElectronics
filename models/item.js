const mongoose = require("mongoose");


const itemSchema = new mongoose.Schema({
	item_name: {
		type: String,
		required: [true, "Item name is required "]
	},
	item_desc: {
		type: String,
		required: [true, "Item desc is required"]
	},
	price: {
		type: Number,
		required: [true, "Price is required"],
		validate: {
			validator: (value) => {

				return value > 0
			},
			message: "price cannot be negative"
		}
	}
})

module.exports = mongoose.model("ITEM", itemSchema)