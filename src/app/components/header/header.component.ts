import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CartItemModel } from 'src/app/models/cart-item-model';
import { CartService } from 'src/app/services/cart.service';
import { TitleService } from 'src/app/services/title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeaderComponent implements OnInit {
  
  title: string = "";
  cartItemsLength = 0;

  constructor(private router: Router, private titleService: TitleService,private cartService:CartService) {}

  ngOnInit() {

    this.router.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Dựa vào đường dẫn hiện tại, thiết lập tiêu đề tương ứng
        const currentRoute = this.router.routerState.snapshot.url;
        let title = '';

        if (currentRoute === '/home') {
          title = 'Shop Giày';
        } else if (currentRoute === '/cart') {
          title = 'Giỏ Hàng';
        } else if (currentRoute === '/account'){
          title="Tài Khoản"
        } 
        this.titleService.setTitle(title);
      });

    // Đăng ký để nhận tiêu đề hiện tại
    this.titleService.currentTitle.subscribe((title) => {
      this.title = title;
    });

    // Đăng ký để lắng nghe thay đổi trong cartItems
    this.cartService.cartItemsSubject.subscribe(cartItems => {
      this.cartItemsLength = cartItems.length;
  });
  
  }

  navigateToSearchPage() {
    this.router.navigate(['/search']);
  }

  navigateToCartPage() {
    this.router.navigate(['/cart']);
  }
}
