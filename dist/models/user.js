import { Schema } from "mongoose";
export const UsersSchema = new Schema({
    name: {
        type: "String",
        required: true,
        trim: true,
    },
    email: {
        type: "String",
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: "String",
        required: true,
    },
    refreshToken: {
        type: "String",
        required: false
    }
}, { timestamps: true });
export default UsersSchema;
//# sourceMappingURL=user.js.map