import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { CartService } from "../../services/cart.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [CommonModule,HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CartPage implements OnInit {

  carts: CartItemModel[] = JSON.parse(localStorage.getItem('cart') || '[]');

  constructor(private cartService: CartService,private router: Router) { }

  ngOnInit() {
  
    // Đăng ký để lắng nghe thay đổi trong cartItems
  this.cartService.cartItemsSubject.subscribe(cartItems => {
      this.carts = cartItems;
  });
  
  }
  
}