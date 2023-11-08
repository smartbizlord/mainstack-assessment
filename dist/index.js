import { createServer } from 'http';
import express from 'express';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import httpStatus from 'http-status';
import { port } from './utils/config.js';
import router from './routes/index.js';
import ApiError from './utils/ApiError.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
// sanitize request data
app.use(ExpressMongoSanitize());
app.use(function (err, req, res, next) {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode
            ? httpStatus.BAD_REQUEST
            : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
});
app.use(function (err, req, res, next) {
    let { statusCode, message } = err;
    if (!err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }
    const response = {
        code: statusCode,
        message,
    };
    res.status(statusCode).send(response);
});
const server = createServer(app);
server.listen(port, () => {
    console.info(`Listening to port ${port}`);
});
//# sourceMappingURL=index.js.map