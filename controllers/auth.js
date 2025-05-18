const userModel = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


exports.register = asyncHandler(async (req, res, next) => {
	//  basically  registaration for the admin
	const { fname, lname, email, password } = req.body;

	if (!fname || !lname || !email || !password) {
		return next(new ErrorHandler(400, "kindly provide all details"))
	}

	const is_existing_user = await userModel.findOne({ email });

	if (is_existing_user) {
		return next(new ErrorHandler(400, "you are already registered , kindly login"))
	}

	//  password validation is not applied yet, we have to do that
	const hashedPassword = await bcrypt.hash(password, 10)
	const user = await userModel.create({ fname, lname, email, password: hashedPassword });

	if (user) {
		return res.status(200)
			.json({
				success: true,
				message: "user is registered successfully",
				data: user
			})
	}

})

exports.login = asyncHandler(async (req, res, next) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return next(new ErrorHandler(400, "kindly provide all details"))
	}

	const is_existing_user = await userModel.findOne({ email });

	if (!is_existing_user) {
		return next(new ErrorHandler(400, "you are not registered yet, kindly register first"))
	}

	if (await bcrypt.compare(password, is_existing_user.password)) {
		const token = jwt.sign({
			_id: is_existing_user._id,
			accountType: is_existing_user.accountType
		},
			process.env.JWT_SECRET,
			{
				expiresIn: "30d"
			})


		return res.cookie("token", token, {
			httpOnly: true,
			sameSite: "Lax",
			expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
			secure: true
		})
			.status(200)
			.json({
				success: true,
				message: "user is logged in successfully",
				data: is_existing_user
			})
	}
	else {
		return next(new ErrorHandler(400, "password is incorrect"))
	}
})

exports.logout = asyncHandler(async (req, res, next) => {
	return res.cookie("token", null, {
		httpOnly: true,
		sameSite: "Lax",
		secure: true,
		expires: new Date(Date.now())
	})
		.status(200)
		.json({
			success: true,
			message: "user is logged out successfully"
		})
})