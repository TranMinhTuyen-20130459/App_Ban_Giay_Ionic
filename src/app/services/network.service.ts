import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class NetworkService {

    public isConnected: boolean = true;

    constructor(private alertController: AlertController) {

        console.log('Khởi tạo NetworkService');
        this.checkNetworkStatus();

        // Gọi lại checkNetworkStatus() 10s
        setInterval(() => {
            this.checkNetworkStatus();
        }, 10000); // 10000 milliseconds = 10s

    }

    // Kiểm tra trạng thái mạng của thiết bị
    async checkNetworkStatus() {
        const status = (await Network.getStatus());
        this.isConnected = status.connected;

        console.log('Trạng thái mạng của thiết bị:' + this.isConnected);

        if (this.isConnected == false) {
            this.displayNetworkAlert();
        }
    }

    // Hiển thị cửa sổ thông báo khi không có mạng
    async displayNetworkAlert() {
        const alert = await this.alertController.create({
            header: 'Lỗi kết nối',
            message: 'Không có kết nối mạng.',
            buttons: ['OK'],
        });
        await alert.present();
        console.log('Hiển thị cửa sổ thông báo tình trạng mạng');
    }
}
