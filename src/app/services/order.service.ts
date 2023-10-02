import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class OrderService {

    constructor(private alertController: AlertController) { }

    // gọi API Post thêm một đơn hàng vào hệ thống
   
}