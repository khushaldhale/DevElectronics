const billModel = require("../models/bill");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const counterModel = require("../models/counter")

exports.generateBill = asyncHandler(async (req, res, next) => {

	const { shop_details, customer_name, customer_location, customer_contact, purchased_items, total_bill } = req.body;

	if (!shop_details || !customer_name || !customer_location || !customer_contact || !total_bill || purchased_items.length === 0) {
		return next(new ErrorHandler(400, "kindly provide all details"))
	}

	// increamenting the counter
	const counter = await counterModel.findOneAndUpdate({}, { $inc: { counter: 1 } })
	const bill = await billModel.create({ shop_details, customer_name, customer_location, customer_contact, purchased_items, total_bill, bill_id: counter.counter });

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
		.populate([
			{
				path: "shop_details",
				model: "SHOPDETAIL"  // Explicitly mention the model name
			},
			{
				path: "purchased_items.item_info",
				populate: {
					path: "category_id",
					model: "CATEGORY"  // Replace with your actual model name
				}
			}
		]);

	return res.status(200).json({
		success: true,
		message: bills.length > 0 ? "Bills fetched successfully" : "No bill is created yet",
		data: bills
	});
});


exports.searchBill = asyncHandler(async (req, res, next) => {

	const customer_name = req.params.id;
	if (!customer_name) {
		return next(new ErrorHandler(400, "kindly porvide customer name"));
	}

	const query = customer_name.includes(" ") ? `"${customer_name}"` : customer_name;

	// Explicitly search with $text in the customer_name field
	const bills = await billModel.find(
		{ $text: { $search: query } },    // Text search in the indexed field
		{ score: { $meta: "textScore" } } // Include relevance score
	)
		.sort({ score: { $meta: "textScore" } }) // Sort by relevance score
		.limit(10); // Limit the number of results


	return res.status(200).json({
		success: bills.length > 0 ? true : false,
		message: bills.length > 0 ? "bills are fetched successfully" : "No bills exists",
		data: bills,
	});
})