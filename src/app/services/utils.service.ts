import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})

export class UtilService {

    constructor() { }

    isValidPhoneNumber(phoneNumber: string): boolean {
        const phoneRegex = /^\d{10}$/; // Kiểm tra xem có đúng 10 chữ số hay không
        return phoneRegex.test(phoneNumber);
    }
}
