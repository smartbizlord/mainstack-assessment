class ApiError extends Error {
	statusCode: string | number
	isOperational: boolean

	constructor(
		statusCode: string | number,
		message: string,
		isOperational = true,
		stack = '',
		validation = false,
	) {
		super(message);
		validation && (this.message = JSON.parse(message));
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export default ApiError;
