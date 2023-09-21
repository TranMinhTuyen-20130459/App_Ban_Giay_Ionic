import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {CartItemModel} from "../models/cart-item-model";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AlertController, LoadingController, ToastController} from "@ionic/angular";
import {Router} from "@angular/router";
import {ProductModel} from "../models/product-model";

@Injectable({
    providedIn: 'root'
})
export class CartService {
   
     addToCart(product: ProductModel) {

    }

    removeFromCart(product: ProductModel) {
       
    }

    private calculateTotal() {
       
    }
}