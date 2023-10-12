import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})

export class UtilService {
   
    constructor(private alertController: AlertController) { }

    isValidPhoneNumber(phoneNumber: string): boolean {
        const phoneRegex = /^\d{10}$/; // Kiểm tra xem có đúng 10 chữ số hay không
        return phoneRegex.test(phoneNumber);
    }

    // hiển thị cửa sổ thông báo chức năng đang được phát triển 
    async displayFeatureUnderDevelopmentAlert() {

        const alert = await this.alertController.create({
            header: 'Thông báo',
            message: 'Chức năng này đang được phát triển !!!',
            buttons: ['OK']
        })

        await alert.present();
    }
}
