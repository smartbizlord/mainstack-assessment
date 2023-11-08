import { Schema } from "mongoose";
export const ProductsSchema = new Schema({
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
}, { timestamps: true });
export default ProductsSchema;
//# sourceMappingURL=product.js.map