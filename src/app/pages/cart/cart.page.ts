import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { CartService } from "../../services/cart.service";
import { AlertController } from '@ionic/angular';
import { NetworkService } from 'src/app/services/network.service';

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
    const alert = await this.alertController.create({
      header: '',
      message: 'Xóa sản phẩm khỏi giỏ hàng ?',
      buttons: [
        {
          text: 'Hủy',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // Xử lý khi người dùng hủy bỏ
            console.log('Hủy xóa sản phẩm khỏi giỏ hàng');
          }
        },
        {
          text: 'Xác nhận',
          handler: () => {
            // Xử lý khi người dùng xác nhận
            console.log('Xóa sản phẩm khỏi giỏ hàng');
            this.cartService.removeItemFromCart(item_cart);
          }
        }
      ]
    });

    await alert.present();
  }

  decreaseQuantity(item_cart: any) {

    this.cartService.decreaseQuantity(item_cart);

  }

  increaseQuantity(item_cart: any) {

    this.cartService.increaseQuantity(item_cart);

  }

  getTotalPriceInCart() {
    return this.cartService._totalPrice;
  }

  navigateToOrderPage() {
    this.router.navigate(['/order']);
  }

}