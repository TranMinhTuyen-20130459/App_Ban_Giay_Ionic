// đây là Model mô hình hóa cấu trúc dữ liệu Json của chi tiết sản phẩm 
export interface ProductDetailModel {
    id_product: number;
    name_product: string;
    star_review: number;
    listed_price: number;
    promotional_price: number;
    list_images: ImageModel[];
    list_size: SizeModel[];
    brand: BrandModel;
    type: TypeModel;
}
export interface ImageModel {
    id_image: number;
    path_image: string;
  }
  
  export interface SizeModel {
    name_size: string;
    quantity_available: number;
  }
  
  export interface BrandModel {
    id_brand: number;
    name_brand: string;
  }
  
  export interface TypeModel {
    id_type: number;
    name_type: string;
  }