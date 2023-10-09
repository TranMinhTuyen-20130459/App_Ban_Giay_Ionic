import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { NetworkService } from 'src/app/services/network.service';
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CartPage implements OnInit {

  _carts: CartItemModel[] = JSON.parse(localStorage.getItem('cart') || '[]');

  constructor(private cartService: CartService,
    private router: Router,
    private alertController: AlertController,
    private networkService: NetworkService) { }

  ngOnInit() {

    // Đăng ký để lắng nghe thay đổi trong cartItems
    this.cartService.cartItemsSubject.subscribe(cartItems => {
      this._carts = cartItems;
    });

  }

  // cửa sổ xác nhận xóa sản phẩm khỏi giỏ hàng
  async openConfirmDialog(item_cart: any) {
    this.cartService.openConfirmDialogRemoveItemCart(item_cart);
  }

  // giảm số lượng của sản phẩm trong giỏ hàng
  decreaseQuantity(item_cart: any) {
    this.cartService.decreaseQuantity(item_cart);
  }

  // tăng số lượng của sản phẩm trong giỏ hàng
  increaseQuantity(item_cart: any) {
    this.cartService.increaseQuantity(item_cart);
  }

  // chuyển đến trang Đặt Hàng
  navigateToOrderPage() {
    this.router.navigate(['/order']);
  }

  getTotalPriceInCart() {
    return this.cartService._totalPrice;
  }



}