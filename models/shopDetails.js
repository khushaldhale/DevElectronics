const mongoose = require("mongoose");


const shopDetailsSchema = new mongoose.Schema(
	{
		shop_name: {
			type: String,
			required: [true, "Shop name is required"]
		},
		shop_address: {
			type: String,
			required: [true, "Shop address is required"]
		},
		gst_no: {
			type: String,
			required: [true, "GST number is required"]
		},
		pan_no: {
			type: String,
			required: [true, "Pan number is required"]
		},
		shop_state: {
			type: String,
			required: [true, "Shop state is required"]
		},
		shop_contact: {
			type: Number,
			required: [true, "Shop contact is required"]
		},
		account_name: {
			type: String,
			required: [true, "Account Name is required"],
			trim: true
		},
		account_number: {
			type: String,
			required: [true, "Account Number is required"]
		},
		ifsc_code: {
			type: String,
			required: [true, "IFSC code is required"],
			trim: true
		},
		bank_name: {
			type: String,
			required: [true, "Bank Name is required"],
			trim: true
		},
		swift_code: {
			type: String,
			required: [true, "Swift code is required"]
		}

	}
)

module.exports = mongoose.model("SHOPDETAIL", shopDetailsSchema)