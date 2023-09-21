import { ProductDetailModel } from "./prod-detail-model";
import { ProductModel } from "./product-model";

export interface CartItemModel {
    product: ProductDetailModel;
    name_size : string;
    quantity: number;
    price: number;
  }