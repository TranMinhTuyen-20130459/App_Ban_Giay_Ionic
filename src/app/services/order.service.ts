import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
    providedIn: 'root',
})
export class OrderService {

    constructor(private alertController: AlertController) { }

    // gọi API thêm một đơn hàng vào hệ thống
}