import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
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
  
  title: string ="";

  constructor(private router: Router, private titleService: TitleService) {}

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
          title="Tài khoản"
        }

        this.titleService.setTitle(title);
      });

    // Đăng ký để nhận tiêu đề hiện tại
    this.titleService.currentTitle.subscribe((title) => {
      this.title = title;
    });
  }

  navigateToSearch() {
    this.router.navigate(['/search']);
  }
}
