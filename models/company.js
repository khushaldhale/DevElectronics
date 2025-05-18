const mongoose = require("mongoose");


const companySchema = new mongoose.Schema(
	{
		company_name: {
			type: String,
			required: [true, "company name is required"],
			trim: true
		},
		items: {
			type: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "ITEM"
				}
			]
		},
		category_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "CATEGORY"
		}
	}
)

module.exports = mongoose.model("COMPANY", companySchema)