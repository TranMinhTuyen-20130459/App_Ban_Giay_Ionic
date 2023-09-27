import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ProductModel } from '../models/product-model';
import { ProductDetailModel } from '../models/prod-detail-model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.backend_api_url;

  constructor(private httpClient: HttpClient) { }

  // Tìm kiếm sản phẩm dựa theo từ khóa do người dùng nhập vào
  SearchProducts(keyword: string): Observable<ProductModel[]> {
    const params = { name: keyword, quantity: '15' };

    return this.httpClient.get<any>(`${this.url}/product-shoes/ds-giay`, { params })
      .pipe(
        catchError((error: any) => {
          console.error('Error searching for products:', error);
          return throwError(error);
        }),
        map((response: any) => this.MapResponseToProductModels(response))
      );
  }
  // Hàm ánh xạ từ JSON sang mảng ProductModel
  private MapResponseToProductModels(response: any): ProductModel[] {
    if (!response || !response.data || !Array.isArray(response.data)) {
      return [];
    }

    console.log(response.data);

    return response.data.map((item: { id_product: any; name_product: any; star_review: any; listed_price: any; promotional_price: any; list_image: any[]; id_status_product: any; }) => ({
      id_product: item.id_product,
      name_product: item.name_product,
      star_review: item.star_review,
      listed_price: item.listed_price,
      promotional_price: item.promotional_price,
      list_images: item.list_image.map((image: any) => image.path_image),
      id_status_product: item.id_status_product
    }));
  }
  // Lấy ra chi tiết của sản phẩm dựa theo id 
  GetDetailProduct(id: number): Observable<ProductDetailModel | null> {
    return this.httpClient.get<any>(`${this.url}/products/infor-product?id=${id}`)
      .pipe(
        catchError((error: any) => {
          console.error('Error getting product details:', error);
          return throwError(error);
        }),
        map((response: any) => this.MapResponseToProductDetailModel(response))
      );
  }
  // Hàm ánh xạ từ JSON sang ProductDetailModel
  private MapResponseToProductDetailModel(response: any): ProductDetailModel | null {
    if (!response || !response.data) {
      return null;
    }

    const data = response.data;

    return {
      id_product: data.id_product,
      name_product: data.name_product,
      star_review: data.star_review,
      listed_price: data.listed_price,
      promotional_price: data.promotional_price,
      list_images: data.list_image.map((image: any) => ({
        id_image: image.id_image,
        path_image: image.path_image
      })),
      list_size: data.list_size.map((size: any) => ({
        name_size: size.name_size,
        quantity_available: size.quantity_available
      })),
      brand: {
        id_brand: data.brand.id_brand,
        name_brand: data.brand.name_brand
      },
      type: {
        id_type: data.type.id_type,
        name_type: data.type.name_type
      }
    };
  }

  // Load danh sách sản phẩm mới tại trang Home
  GetNewProducts(page: number, pageSize: number): Observable<ProductModel[]> {

    console.log('Đây là hàm lấy danh sách sản phẩm mới');
    console.log('PageNumber:' + page);

    const params = { page: page, pageSize: pageSize };

    return this.httpClient.get<any>(`${this.url}/product-shoes/ds-giay-moi`, { params })
      .pipe(
        catchError((error: any) => {
          console.error('Error searching for products:', error);
          return throwError(error);
        }),
        map((response: any) => this.MapResponseToProductModels(response))
      );
  }

}
