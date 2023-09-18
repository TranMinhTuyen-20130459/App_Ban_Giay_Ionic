import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ProductModel } from '../models/product-model';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.backend_api_url;

  constructor(private httpClient: HttpClient) { }

  // Tìm kiếm sản phẩm dựa theo từ khóa do người dùng nhập vào
  SearchProducts(keyword: string): Observable<ProductModel[]> {
    const params = { name: keyword, quantity: '5' };

    return this.httpClient.get<any>(`${this.url}/product-shoes/ds-giay`, { params })
      .pipe(
        catchError((error: any) => {
          console.error('Error searching for products:', error);
          return throwError(error);
        }),
        map((response: any) => this.MapResponseToProductModels(response))
      );
  }
  // Hàm chuyển đổi từ dữ liệu JSON sang mảng ProductModel
  private MapResponseToProductModels(response: any): ProductModel[] {
    if (!response || !response.data || !Array.isArray(response.data)) {
      return [];
    }

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
  // Lấy danh sách giày của hãng Nike dành cho Nam 
  GetListShoesOfNikeForMen(page: number = 1) {
    return this.httpClient.get(`${this.url}/product-shoes/ds-giay-nike-nam?page=${page}&pageSize=15`)
  }

}
