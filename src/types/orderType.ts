export interface IOrder {
  totalPrice: number;
  orderer: string;
  deliveryInfo: string;
  itemList: string[];
  note: string;
  orderStatus: string;
  voucher: string;
}
