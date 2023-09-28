import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DistrictData } from '../models/district-model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) { }

  getTinhThanhData(): Observable<any[]> {
    return this.httpClient.get<any[]>('https://provinces.open-api.vn/api/?depth=2');
  }

  getDistrictData(idProvence: any): Observable<DistrictData> {
    return this.httpClient.get<DistrictData>('https://provinces.open-api.vn/api/d/' + idProvence + '/?depth=2');
  }

}
