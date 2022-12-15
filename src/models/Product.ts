import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
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
    categories: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    images: {
      type: [String],
    },
    stock: {
      type: Number,
    },
    discounts: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
    status: {
      type: Number, //0: INACTIVE, 1: SCHEDULED, 2:PUBLISHED
      default: 0,
    },
    key: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
