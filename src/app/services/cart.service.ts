import { Injectable } from '@angular/core';
import { CartItemModel } from '../models/cart-item-model';
import { ProductDetailModel, SizeModel } from '../models/prod-detail-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CartService {

    public _cartItems: CartItemModel[] = JSON.parse(localStorage.getItem("carts") || '[]');

    // BehaviorSubject để theo dõi thay đổi trong giỏ hàng
    private _cartItemsSubject: BehaviorSubject<CartItemModel[]> = new BehaviorSubject<CartItemModel[]>(this._cartItems);

     // Getter để truy cập BehaviorSubject
     get cartItemsSubject(): BehaviorSubject<CartItemModel[]> {
        return this._cartItemsSubject;
    }

    addItemToCart(product: ProductDetailModel, size:SizeModel) {
        
       /*
        * cartItems là biến để lưu trữ các sản phẩm
        * nếu sản phẩm chưa có trong giỏ hàng thì thêm vào (dựa vào id_product để check sự tồn tại của sản phẩm)
        * nếu sản phẩm và size của sản phẩm đó đã có trong giỏ hàng thì quantity tăng thêm 1 (dựa vào product.id_product && size.name_size để check sự tồn tại)        
        */

    // Tìm kiếm xem sản phẩm và size đã tồn tại trong giỏ hàng chưa
    const existingCartItem = this._cartItems.find(item => item.product.id_product === product.id_product && item.name_size === size.name_size);

    if (existingCartItem) {
        // Nếu sản phẩm và size đã tồn tại, tăng quantity lên 1
        existingCartItem.quantity += 1;
    } else {
        // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
        const newCartItem: CartItemModel = {
            product,
            name_size: size.name_size,
            quantity: 1, // Khởi tạo với quantity bằng 1
            price: 
                  product.promotional_price < product.listed_price?
                  product.promotional_price:product.listed_price // Giá của sản phẩm
        };
        this._cartItems.push(newCartItem);
    }

    // Lưu danh sách sản phẩm vào localStorage
    localStorage.setItem("carts", JSON.stringify(this._cartItems));

    }

    removeItemFromCart(product: ProductDetailModel) {

    }

    private calculateTotal() {

    }
}