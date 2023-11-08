import dotenv from 'dotenv';
import path from 'path';
import Joi from 'joi';
dotenv.config({ path: path.join(process.cwd(), '/.env') });
const envVarsSchema = Joi.object()
    .keys({
    NODE_ENV: Joi.string()
        .valid('production', 'development', 'test')
        .required(),
    PORT: Joi.number().default(3001),
    DB_URL: Joi.string().required().description('DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
        .default(30)
        .description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
        .default(30)
        .description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
        .default(10)
        .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
        .default(10)
        .description('minutes after which verify email token expires'),
})
    .unknown();
const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: 'key' } })
    .validate(process.env);
// const { value: envVars, error } = /*process.env != null ? envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env) : */ envVarsSchema.prefs({ errors: { label: 'key' } }).validate(envPlaceHolder);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}
export const env = envVars.NODE_ENV;
export const port = envVars.PORT;
export const mongooseCon = {
    url: envVars.DB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
};
export const jwtObj = {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
};
const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mongooseCon: {
        url: envVars.DB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
        resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
        verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    },
};
export default config;
//# sourceMappingURL=config.js.map