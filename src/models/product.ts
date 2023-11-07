import { Schema, ObjectId } from "mongoose";
import { productSchema } from "../types/models.js";

export const ProductsSchema = new Schema<productSchema>({
    name: {
        type: "String",
        required: true,
        trim: true,
    },
    img: {
        type: "String",
        required: true,
        trim: true,
    },
    category: {
        type: "String",
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    price: {
        type: "Number",
        required: true,
        min: 2000,
    },
}, { timestamps: true })
export default ProductsSchema