import { ImageModel } from "./prod-detail-model";

// đây là Model mô hình hóa cấu trúc dữ liệu Json của sản phẩm sau khi được tìm kiếm 
export interface ProductModel {
  id_product: number;
  name_product: string;
  star_review: number;
  listed_price: number;
  promotional_price: number;
  list_images: ImageModel[];
  id_status_product: number;
}