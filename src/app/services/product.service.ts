import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = environment.backend_api_url;

  constructor(private httpClient: HttpClient) { }

  // Lấy danh sách giày của hãng Nike dành cho Nam 
  GetListShoesOfNikeForMen(page: number=1){
    return this.httpClient.get(`${this.url}/product-shoes/ds-giay-nike-nam?page=${page}&pageSize=15`)
  }

  

}
