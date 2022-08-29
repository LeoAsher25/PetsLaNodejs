import mongoose, { Schema } from "mongoose";

const OrderItemSchema = new Schema({
  title: String,
  price: Number,
  quantity: Number,
});

const OrderSchema = new Schema(
  {
    orderer: {
      type: String,
    },
    deliveryInfoId: {
      type: String,
    },
    itemList: {
      type: [OrderItemSchema],
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
