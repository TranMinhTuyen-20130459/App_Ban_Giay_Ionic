import { Injectable } from '@angular/core';
import { CartItemModel } from '../models/cart-item-model';
import { ProductDetailModel, SizeModel } from '../models/prod-detail-model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class CartService {

    public _cartItems: CartItemModel[] = JSON.parse(localStorage.getItem("carts") || '[]');

    public _totalPrice: number = this.getTotalPrice();

    // BehaviorSubject để theo dõi thay đổi trong giỏ hàng
    private _cartItemsSubject: BehaviorSubject<CartItemModel[]> = new BehaviorSubject<CartItemModel[]>(this._cartItems);

    // BehaviorSubject để theo dõi thay đổi của _totalPrice
    private _totalPriceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(this._totalPrice);

    // Getter để truy cập BehaviorSubject
    get cartItemsSubject(): BehaviorSubject<CartItemModel[]> {
        return this._cartItemsSubject;
    }

    get totalPriceSubject(): BehaviorSubject<number> {
        return this._totalPriceSubject;
    }

    addItemToCart(product: ProductDetailModel, size: SizeModel) {

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
                    product.promotional_price < product.listed_price ?
                        product.promotional_price : product.listed_price // Giá của sản phẩm
            };
            this._cartItems.push(newCartItem);
        }

        // Lưu danh sách sản phẩm vào localStorage
        localStorage.setItem("carts", JSON.stringify(this._cartItems));

        this.calculateTotal();
    }

    removeItemFromCart(item_cart: CartItemModel) {
        // Lọc ra tất cả các sản phẩm ngoại trừ sản phẩm cần xóa
        this._cartItems = this._cartItems.filter(item => (item.product.id_product !== item_cart.product.id_product) || (item.name_size !== item_cart.name_size));

        // Lưu danh sách sản phẩm đã cập nhật vào localStorage
        localStorage.setItem("carts", JSON.stringify(this._cartItems));

        // Tính lại tổng số tiền
        this.calculateTotal();

        // Cập nhật BehaviorSubject để thông báo sự thay đổi trong giỏ hàng
        this._cartItemsSubject.next(this._cartItems);
    }

    // tính lại giá trị của giỏ hàng mỗi khi có sự thay đổi
    private calculateTotal() {

        let totalPrice = 0;

        this._cartItems.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });

        // Lưu giá tiền mới vào biến _totalPrice
        this._totalPrice = totalPrice;

        // Thông báo sự thay đổi của _totalPrice cho các thành phần quan sát
        this._totalPriceSubject.next(this._totalPrice);
    }

    // đảm bảo khi reset lại trang, tổng giá trong giỏ hàng không thay đổi
    private getTotalPrice(): number {

        let totalPrice = 0;
        this._cartItems.forEach((item) => {
            totalPrice += item.price * item.quantity;
        });

        return totalPrice;
    }

    // giảm số lượng của một item_cart
    decreaseQuantity(item_cart: CartItemModel) {
        const existingCartItem = this._cartItems.find(item => item.product.id_product === item_cart.product.id_product && item.name_size === item_cart.name_size);

        if (existingCartItem) {
            if (existingCartItem.quantity > 1) {
                existingCartItem.quantity -= 1;
            } else {
                // Nếu quantity là 1 hoặc ít hơn, bạn có thể xóa mục này khỏi giỏ hàng
                this.removeItemFromCart(existingCartItem);
            }

            // Lưu danh sách sản phẩm đã cập nhật vào localStorage
            localStorage.setItem("carts", JSON.stringify(this._cartItems));

            // Tính lại tổng số tiền
            this.calculateTotal();

            // Cập nhật BehaviorSubject để thông báo sự thay đổi trong giỏ hàng
            this._cartItemsSubject.next(this._cartItems);
        }
    }

    // tăng số lượng của một item_cart
    increaseQuantity(item_cart: CartItemModel) {
        const existingCartItem = this._cartItems.find(item => item.product.id_product === item_cart.product.id_product && item.name_size === item_cart.name_size);

        if (existingCartItem) {
            existingCartItem.quantity += 1;

            // Lưu danh sách sản phẩm đã cập nhật vào localStorage
            localStorage.setItem("carts", JSON.stringify(this._cartItems));

            // Tính lại tổng số tiền
            this.calculateTotal();

            // Cập nhật BehaviorSubject để thông báo sự thay đổi trong giỏ hàng
            this._cartItemsSubject.next(this._cartItems);
        }
    }


}