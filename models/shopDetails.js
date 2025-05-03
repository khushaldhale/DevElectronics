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
		}
	}
)

module.exports = mongoose.model("SHOPDETAIL", shopDetailsSchema)