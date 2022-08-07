export interface IProduct {
  title: string;
  images: string[];
  price: number;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
  description?: string;
  categoryId?: string;
  stock?: number;
}

export interface IProductInCart
  extends Omit<IProduct, "description" | "categoryId" | "stock"> {
  quantity: number;
}

export interface IProductInWishList
  extends Omit<IProduct, "stock" | "categoryId"> {}

export interface ICategory {}
