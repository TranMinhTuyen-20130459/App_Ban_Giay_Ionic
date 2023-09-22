import { ProductDetailModel } from "./prod-detail-model";

export interface CartItemModel {
    product: ProductDetailModel;
    name_size : string;
    quantity: number;
    price: number;
  }