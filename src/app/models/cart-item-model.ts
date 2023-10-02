import { ProductDetailModel } from "./prod-detail-model";

// dùng trong Giỏ Hàng
export interface CartItemModel {
  product: ProductDetailModel;
  name_size: string;
  quantity: number;
  price: number;
}

// dùng trong API tạo đơn hàng
export interface CartItemModel2 {
  id_product: number;
  name_size: string;
  quantity: number;
  price: number;
}

