const billModel = require("../models/bill");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");


exports.generateBill = asyncHandler(async (req, res, next) => {

	const { shop_details, customer_name, customer_location, customer_contact, purchased_items, total_bill } = req.body;


	console.log(shop_details, customer_name, customer_location, customer_contact, purchased_items, total_bill)

	if (!shop_details || !customer_name || !customer_location || !customer_contact || !total_bill || purchased_items.length === 0) {
		return next(new ErrorHandler(400, "kindly provide all details"))
	}


	const bill = await billModel.create({ shop_details, customer_name, customer_location, customer_contact, purchased_items, total_bill });

	if (bill) {
		return res.status(200)
			.json({
				success: true,
				message: "Bill is generated successfully",
				data: bill
			})
	}


})
exports.getAllBills = asyncHandler(async (req, res, next) => {
	const bills = await billModel.find({})
		.sort({ createdAt: -1 })
		.populate("shop_details")
		.populate("purchased_items.item_info"); // 🔑 Populate nested reference

	return res.status(200).json({
		success: true,
		message: bills.length > 0 ? "Bills fetched successfully" : "No bill is created yet",
		data: bills
	});
});
