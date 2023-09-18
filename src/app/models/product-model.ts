export interface ProductModel {
    id_product: number;
    name_product: string;
    star_review: number;
    listed_price: number;
    promotional_price: number;
    list_images: ImageModel[]; // Thay vì "list_images" trong JSON, sử dụng "list_image" ở đây
    id_status_product: number;
  }
  
  export interface ImageModel {
    id_image: number;
    path_image: string;
  }
  