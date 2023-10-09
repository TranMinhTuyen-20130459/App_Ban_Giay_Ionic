import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header-prod-detail',
  templateUrl: './header-prod-detail.component.html',
  styleUrls: ['./header-prod-detail.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderProdDetailComponent implements OnInit {

  cartItemsLength = 0;

  constructor(private router: Router,
    private cartService: CartService) {

    // Đăng ký lắng nghe sự thay đổi trong cartItems
    this.cartService.cartItemsSubject.subscribe(cartItems => {
      this.cartItemsLength = cartItems.length;
    })

  }

  ngOnInit() { }

  navigateToHomeOrSearchPage() {

    if (this.router.url.includes('/home'))
      this.router.navigate(['/home']);
    else if (this.router.url.includes('/search'))
      this.router.navigate(['/search']);

  }

  navigateToSearchPage() {
    this.router.navigate(['/search']);
  }

  navigateToCartPage() {
    this.router.navigate(['/cart']);
  }

}
