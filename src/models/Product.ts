import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200,
    },
    description: {
      type: String,
      maxlength: 1500,
    },
    price: {
      type: Number,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
    },
    images: {
      type: [String],
    },
    stock: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
