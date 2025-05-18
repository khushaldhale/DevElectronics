const categoryModel = require("../models/category");
const userModel = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const itemModel = require("../models/item")


exports.createCategory = asyncHandler(async (req, res, next) => {
	const { category_name, HSN } = req.body;
	const user_id = req.decode._id;

	if (!category_name || !HSN) {
		return next(new ErrorHandler(400, "kindly provide  details"))
	}

	const is_existing_category = await categoryModel.findOne({ $or: [{ category_name }, { HSN }] });

	if (is_existing_category) {
		return next(new ErrorHandler(400, "category or HSN already exists, kindly create a  new one"))
	}

	const category = await categoryModel.create({ category_name, HSN });


	const user = await userModel.findByIdAndUpdate(user_id, { $push: { categories: category._id } }, { new: true, runValidators: true })

	if (category && user) {
		return res.status(200)
			.json({
				success: true,
				message: "category is created  successfully",
				data: category
			})
	}
})

exports.getAllCategories = asyncHandler(async (req, res, next) => {

	const response = await categoryModel.find({});

	return res.status(200)
		.json({
			success: true,
			message: response.length > 0 ? "categories are fetched successfully " : "No category is created yet",
			data: response
		})
})

exports.deleteCategory = asyncHandler(async (req, res, next) => {
	const category_id = req.params.id;
	const user_id = req.decode._id;

	if (!category_id) {
		return next(new ErrorHandler(400, "kindly provide an category id"))
	}

	const deletedCategory = await categoryModel.findByIdAndDelete(category_id);

	if (!deletedCategory) {
		return next(new ErrorHandler(400, "invalid categiry id or  category that are you  trying to delete does  not exists"))
	}

	const user = await userModel.findByIdAndUpdate(user_id, { $pull: { categories: category_id } }, { new: true, runValidators: true })

	if (deletedCategory && user) {

		return res.status(200)
			.json({
				success: true,
				message: "category is deleted successfully",
				data: deletedCategory
			})
	}
})

//   we are returning items here not categories
exports.getItemsByCategory = asyncHandler(async (req, res, next) => {
	const category_id = req.params.id;

	if (!category_id) {
		return next(new ErrorHandler(400, "kindly provide an category id"))
	}

	const items = await itemModel.find({ category_id })


	return res.status(200)
		.json({
			success: true,
			message: items.length > 0 ? "items are fetched successfully" : "No items are created here",
			data: items
		})

})