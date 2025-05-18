const itemModel = require("../models/item");
const userModel = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const fileUpload = require("../utils/fileUpload");
const companyModel = require("../models/company");

exports.createItem = asyncHandler(async (req, res, next) => {

	const { item_name, item_desc, item_price, category_id, company_id } = req.body;
	const item_img = req.files.item_img;

	console.log(req.body)

	if (!item_name || !item_desc || !item_price || !category_id || !company_id) {
		return next(new ErrorHandler(400, "kindly provide all details"))
	}

	const is_existing_item = await itemModel.findOne({ item_name, item_price });

	if (is_existing_item) {
		return next(new ErrorHandler(400, "Item already exists, kindly create a new item"))
	}



	const secure_url = await fileUpload(item_img, "DevElectronics")

	const item = await itemModel.create({ item_name, item_desc, item_price, item_img: secure_url, category_id, company_id });

	const company = await companyModel.findByIdAndUpdate(company_id, { $push: { items: item._id } }, { new: true, runValidators: true })

	return res.status(200)
		.json({
			success: true,
			message: 'item is created successfully',
			data: item
		})
})

exports.deleteItem = asyncHandler(async (req, res, next) => {

	const item_id = req.params.id;

	if (!item_id) {
		return next(new ErrorHandler(400, "kindly provide an item id"))
	}
	const deleted_item = await itemModel.findByIdAndDelete(item_id);
	if (!deleted_item) {
		return next(new ErrorHandler(400, "invalid item id or item that are you trying to delete does not exists"))
	}
	const company = await companyModel.findByIdAndUpdate(deleted_item.company_id, { $pull: { items: item_id } }, { new: true, runValidators: true })

	if (company && deleted_item) {

		return res.status(200)
			.json({
				success: true,
				message: "item is deleted successfully",
				data: deleted_item
			})
	}
})

exports.getAllItems = asyncHandler(async (req, res, next) => {

	const items = await itemModel.find({});

	return res.status(200)
		.json({
			success: true,
			message: items.length > 0 ? "items are fetched successfully " : "No items  are created yet",
			data: items
		})
})

exports.updateItem = asyncHandler(async (req, res, next) => {
	const item_id = req.params.id;

	const { item_name, item_desc, item_price, category_id, item_img, company_id } = req.body;
	const file_item_img = req?.files?.item_img;

	if (!item_id) {
		return next(new ErrorHandler(400, "kindly provide an item id"))
	}

	if (!item_name || !item_desc || !item_price || !category_id || !company_id) {
		return next(new ErrorHandler(400, "kindly provide all details"))
	}
	let secure_url = ""
	if (!item_img) {

		//  have to delete the previous image
		secure_url = await fileUpload(file_item_img, "DevElectronics")

	}
	const updated_item = await itemModel.findByIdAndUpdate(item_id, { item_name, item_desc, item_price, category_id, item_img: item_img ? item_img : secure_url, company_id }, { new: true, runValidators: true })

	if (updated_item) {
		return res.status(200)
			.json({
				success: true,
				message: "item is updated successfully",
				data: updated_item
			})
	}

})

exports.getItem = asyncHandler(async (req, res, next) => {
	const item_id = req.params.id;
	if (!item_id) {
		return next(new ErrorHandler(400, "kindly provide an item id"))
	}

	const item = await itemModel.findById(item_id);

	if (item) {
		return res.status(200)
			.json({
				success: true,
				message: 'item is fetched successfully',
				data: item
			})
	}
	else {
		return next(new ErrorHandler(400, "invalid item id"))
	}
})

exports.searchItem = asyncHandler(async (req, res, next) => {
	const { item_name } = req.body;

	if (!item_name) {
		return next(new ErrorHandler(400, "Item name is not provided yet"));
	}

	// Ensure that the search term is formatted correctly for phrase searches
	const query = item_name.includes(" ") ? `"${item_name}"` : item_name;

	try {
		// Explicitly search with $text in the item_name field
		const items = await itemModel.find(
			{ $text: { $search: query } },    // Text search in the indexed field
			{ score: { $meta: "textScore" } } // Include relevance score
		)
			.sort({ score: { $meta: "textScore" } }) // Sort by relevance score
			.limit(10); // Limit the number of results

		return res.status(200).json({
			success: true,
			message: "Items are fetched successfully",
			data: items,
		});
	} catch (error) {
		return next(new ErrorHandler(500, `Error while fetching items: ${error.message}`));
	}
});


exports.getItemsByCompany = asyncHandler(async (req, res, next) => {

	const company_id = req.params.company_id;

	const items = await itemModel.find({ company_id });

	return res.status(200)
		.json({
			success: true,
			message: items.length > 0 ? "Items are fetched successfully" : "No items are created here",
			data: items

		})
})