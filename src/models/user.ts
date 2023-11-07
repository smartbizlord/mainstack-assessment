import { Schema } from "mongoose";
import { userSchema } from "../types/models.js";

export const UsersSchema = new Schema<userSchema>({
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
}, { timestamps: true })
export default UsersSchema