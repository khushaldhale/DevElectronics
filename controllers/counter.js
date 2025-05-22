const counterModel = require("../models/counter");
const asyncHandler = require("../utils/asyncHandler");


exports.createCounter = asyncHandler(async (req, res, next) => {
	const counter = await counterModel.create({ counter: 100 });

	return res.status(200)
		.json({
			success: true,
			message: "counter is created ",
			data: counter
		})
})