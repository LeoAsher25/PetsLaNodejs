import mongoose, { Schema } from "mongoose";
import { UserSchema } from "./User";

const OrderSchema = new Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    orderer: {
      type: UserSchema,
      required: true,
    },
    recipientInfo: {
      type: Object,
    },
    // recipientName: {
    //   type: String,
    // },
    // receivingAddress: {
    //   type: String,
    // },
    // receivingPhone: {
    //   type: String,
    // },
    itemList: {
      type: [Object],
    },
    note: {
      type: String,
      maxlength: 500,
    },
    orderStatus: {
      type: String,
    },
    voucher: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

export default Order;
