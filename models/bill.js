const mongoose = require("mongoose");



const billSchema = new mongoose.Schema(
	{
		shop_details: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "SHOPDETAIL"
		},
		customer_name: {
			type: String,
			required: [true, "Customer name is required "]
		},
		customer_location: {
			type: String,
			required: [true, "Customer location is required"]
		},
		customer_contact: {
			type: Number,
			required: [true, "Customer contact is required"]
		},
		purchased_items: {
			type: [
				{
					item_info: {
						type: mongoose.Schema.Types.ObjectId,
						ref: "ITEM",
						required: true
					},
					quantity: {
						type: Number,
						required: true
					},
					gstOpted: {
						type: Boolean,
						required: true
					},
					gstPercentage: {
						type: Number
					},
					total_amount: {
						type: Number,
						required: true
					},
					gst_amount: {
						type: Number,
						required: true
					},
					item_amount: {
						type: Number,
						required: true
					}
				}
			]
		},
		total_bill: {
			type: Number,
			required: [true, "Total amount is required"]
		}

	}, {
	timestamps: true
}
)


module.exports = mongoose.model("BILL", billSchema)