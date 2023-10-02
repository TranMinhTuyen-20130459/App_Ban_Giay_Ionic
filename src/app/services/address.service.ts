import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DistrictModel } from '../models/administrative-unit-model';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  // gọi API lấy danh sách Tỉnh/Thành
  GetProvinceData(): Observable<any[]> {
    return this.httpClient.get<any[]>('https://provinces.open-api.vn/api/p/');
  }

  // gọi API lấy danh sách Quận/Huyện trong Tỉnh/Thành
  GetDistrictData(idProvince: any): Observable<DistrictModel> {
    console.log(idProvince);
    return this.httpClient.get<DistrictModel>('https://provinces.open-api.vn/api/p/' + idProvince + '/?depth=2');
  }

  // gọi API lấy danh sách Phường/Xã trong Quận/Huyện
  GetWardData(idDistrict: any): Observable<any[]> {
    return this.httpClient.get<any[]>('https://provinces.open-api.vn/api/d/' + idDistrict + '/?depth=2');
  }



}
