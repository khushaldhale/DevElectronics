const { hashSync } = require("bcrypt");
const mongoose = require("mongoose");


const categorySchema = new mongoose.Schema(
	{
		category_name: {
			type: String,
			required: [true, "category name is required"],
			trim: true
		},
		HSN: {
			type: String,
			required: [true, "HSN is required"],
			trim: true
		},
		companies: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "COMPANY"
				}
			]
		}
	}
)

module.exports = mongoose.model("CATEGORY", categorySchema)