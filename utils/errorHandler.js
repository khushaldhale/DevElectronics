class ErrorHandler extends Error {
	constructor(statusCode, message) {
		super(message);
		this.statusCode = statusCode;
		Error.captureStackTrace(this, this.constructor);
		this.name = this.constructor.name;
	}
}

module.exports = ErrorHandler;