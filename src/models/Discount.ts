import mongoose, { Schema } from "mongoose";

const DiscountSchema = new Schema(
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
    discountPercent: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
    },
    expiredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Discount = mongoose.model("Discount", DiscountSchema);

export default Discount;
