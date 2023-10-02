import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class OrderService {

    private url = environment.backend_api_url;

    constructor(private httpClient: HttpClient) { }

    // gọi API Post thêm một đơn hàng vào hệ thống
    CreateOrder(orderData: any): Observable<any> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        const url = `${this.url}/order/create-order`;

        console.log(orderData);

        return this.httpClient.post(url, orderData, httpOptions);
    }

}