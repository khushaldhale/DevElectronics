const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema(
	{
		category_name: {
			type: String,
			required: [true, "category name is required"],
			trim: true
		},
		items: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "ITEM"
				}
			]
		}
	}
)

module.exports = mongoose.model("CATEGORY", categorySchema)