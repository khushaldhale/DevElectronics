const companyModel = require("../models/company");
const categoryModel = require("../models/category");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");


exports.createCompany = asyncHandler(async (req, res, next) => {
	const { company_name, category_id } = req.body;

	if (!company_name || !category_id) {
		return next(new ErrorHandler(400, "kinldy provide details"))
	}

	const is_existing_company = await companyModel.findOne({ company_name, category_id });

	if (is_existing_company) {
		return next(new ErrorHandler(400, "company already exists, kindly create a new"))
	}

	const company = await companyModel.create({ company_name, category_id });

	const category = await categoryModel.findByIdAndUpdate(category_id, { $push: { companies: company._id } }, { new: true, runValidators: true })

	if (company && category) {
		return res.status(200)
			.json({
				success: true,
				message: "company is created successfully",
				data: company
			})
	}

})


//  companies  via category
exports.getAllCompanies = asyncHandler(async (req, res, next) => {

	const category_id = req.params.catId;

	const companies = await companyModel.find({ category_id });


	return res.status(200)
		.json({
			success: true,
			message: companies.length > 0 ? "companies are fetched successfully" : "No company is created yet ",
			data: companies
		})

})

// all the products which are listed in this company will also be deleted.
//  have to implement this.
//  company within the category is deleted
exports.deleteCompany = asyncHandler(async (req, res, next) => {

	const company_id = req.params.id;

	if (!company_id) {
		return next(new ErrorHandler(400, 'kindly provide an company id'))
	}

	const deletedCompany = await companyModel.findByIdAndDelete(company_id);
	if (deletedCompany) {

		const category = await categoryModel.findByIdAndUpdate(deletedCompany.category_id, { $pull: { companies: deletedCompany._id } }, { new: true, runValidators: true })

	}
	if (deletedCompany) {
		return res.status(200)
			.json({
				success: true,
				message: "company is deleted successfully",
				data: deletedCompany
			})
	} else {

		return next(new ErrorHandler(400, "company that are you trying  to delete doesnt exists "))

	}

})

// update and get particular remained