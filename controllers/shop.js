const shopModel = require("../models/shopDetails");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");


exports.createShop = asyncHandler(async (req, res, next) => {
	const { shop_name, shop_address, gst_no, pan_no, shop_state, shop_contact } = req.body;

	if (!shop_name || !shop_address || !gst_no || !pan_no || !shop_state || !shop_contact) {
		return next(new ErrorHandler(400, "kindly provide all details"))
	}

	const shop = await shopModel.create({ shop_name, shop_address, gst_no, pan_no, shop_state, shop_contact });

	if (shop) {
		return res.status(200)
			.json({
				success: true,
				message: 'shop details are inserted successfully',
				data: shop
			})
	}
})



exports.getShop = asyncHandler(async (req, res, next) => {
	const shop = await shopModel.find({});

	return res.status(200)
		.json({
			success: true,
			message: shop.length > 0 ? " shop is fetched successfully " : "No shops are created yet ",
			data: shop[0]
		})

})