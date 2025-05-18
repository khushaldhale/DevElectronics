const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
require("dotenv").config();



exports.authentication = asyncHandler(async (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		return next(new ErrorHandler(401, "you are not logged in  yet"))
	}

	const decode = jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
		if (error) {
			return next(new ErrorHandler(403, "Invalid token"))
		}
		req.decode = decode;
		return next();
	})
})



exports.isAdmin = asyncHandler(async (req, res, next) => {
	if (req.decode.accountType !== "admin") {
		return next(new ErrorHandler(403, "This is a protected route for admin only "))
	}
	return next()
})

exports.isUser = asyncHandler(async (req, res, next) => {
	if (req.decode.accountType !== "user") {
		return next(new ErrorHandler(403, "This is a protected route for user only "))
	}
	return next()
})