export interface IProduct {
  name: string;
  images: string[];
  price: number;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  categories?: string;
  stock?: number;
}

export interface IProductInCart
  extends Omit<IProduct, "description" | "categories" | "stock"> {
  quantity: number;
}

export interface IProductInWishList
  extends Omit<IProduct, "stock" | "categories"> {}

export interface ICategory {}
