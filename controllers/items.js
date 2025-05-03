const itemModel = require("../models/item");
const userModel = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");


exports.createItem = asyncHandler(async (req, res, next) => {

	const { item_name, item_desc, price } = req.body;
	const user_id = req.decode._id;

	if (!item_name || !item_desc || !price) {
		return next(new ErrorHandler(400, "kindly provide all details"))
	}

	const is_existing_item = await itemModel.findOne({ item_name, price });

	if (is_existing_item) {
		return next(new ErrorHandler(400, "Item already exists, kindly create a new item"))
	}

	const item = await itemModel.create({ item_name, item_desc, price });

	const user = await userModel.findByIdAndUpdate(user_id, { $push: { items: item._id } }, { new: true, runValidators: true })


	return res.status(200)
		.json({
			success: true,
			message: 'item is created successfully',
			data: item
		})
})

exports.deleteItem = asyncHandler(async (req, res, next) => {

	const item_id = req.params.id;
	const user_id = req.decode._id;

	if (!item_id) {
		return next(new ErrorHandler(400, "kindly provide an item id"))
	}

	const deleted_item = await itemModel.findByIdAndDelete(item_id);

	if (!deleted_item) {
		return next(new ErrorHandler(400, "invalid item id or item that are you trying to delete does not exists"))
	}

	const user = await userModel.findByIdAndUpdate(user_id, { $pull: { items: item_id } }, { new: true, runValidators: true })


	if (user && deleted_item) {

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

	const { item_name, item_desc, price } = req.body;

	if (!item_id) {
		return next(new ErrorHandler(400, "kindly provide an item id"))
	}

	if (!item_name || !item_desc || !price) {
		return next(new ErrorHandler(400, "kindly provide all details"))
	}

	const updated_item = await itemModel.findByIdAndUpdate(item_id, { item_name, item_desc, price }, { new: true, runValidators: true })

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