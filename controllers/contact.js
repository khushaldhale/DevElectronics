const contactModel = require("../models/contact");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");



exports.createContact = asyncHandler(async (req, res, next) => {

	const { fname, lname, email, contact, subject, message } = req.body;

	if (!fname || !lname || !email || !contact || !subject || !message) {
		return next(new ErrorHandler(400, "kindly provide all details"))
	}

	const contact_doc = await contactModel.create({ fname, lname, email, contact, subject, message });

	if (contact_doc) {
		return res.status(200)
			.json({
				success: true,
				message: "contact is created successfully",
				data: contact_doc
			})
	}

})