export interface IRequestOrderData {
  orderer: string;
  deliveryInfoId: string;
  itemList: IOrderProduct[];
  note: string;
  voucher?: string;
}

export interface IOrder extends IRequestOrderData {
  orderStatus: EOrderStatus;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
}

export enum EOrderStatus {
  PENDING = "pending",
  SHIPING = "shiping",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
}

export interface IOrderProduct {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}
