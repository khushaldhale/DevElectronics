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
	},
	item_img: {
		type: String,
		required: [true, "Kindly provide an Item image"]
	},
	category_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "CATEGORY"
	}
})

module.exports = mongoose.model("ITEM", itemSchema)