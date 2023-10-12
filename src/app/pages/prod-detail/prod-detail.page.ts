import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { IonicSlides } from '@ionic/angular';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProductDetailModel, SizeModel } from 'src/app/models/prod-detail-model';
import { CartService } from 'src/app/services/cart.service';
import { ToastController } from '@ionic/angular';
import { NetworkService } from 'src/app/services/network.service';
import { HeaderProdDetailComponent } from 'src/app/components/header-prod-detail/header-prod-detail.component';

@Component({
  selector: 'app-prod-detail',
  templateUrl: './prod-detail.page.html',
  styleUrls: ['./prod-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, HeaderProdDetailComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProdDetailPage implements OnInit {

  product: ProductDetailModel | undefined;
  showData = false;
  swiperModules = [IonicSlides];

  selectedSize: SizeModel = { name_size: '', quantity_available: 0 }; // size được người dùng chọn

  constructor(private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private toastController: ToastController,
    private networkService: NetworkService) { }

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.product = data.product;
      this.showData = true;
    });
  }

  // hàm xử lý khi người dùng chọn Size  
  handleWhenSelectSizeChange(e: any) {
    this.selectedSize = e.detail.value;
  }

  // thêm sản phẩm vào Giỏ Hàng
  async addToCart(product: any) {
    console.log('Size:' + this.selectedSize);

    if (this.selectedSize.name_size == "") {
      const toast = await this.toastController.create({
        message: 'Bạn hãy chọn size cho sản phẩm',
        duration: 2000, // Thời gian hiển thị (ms)
        position: 'top', // Vị trí hiển thị
        color: 'danger' // Đặt màu sắc chính của Toast thành 'danger' (màu đỏ)
      });
      await toast.present();
      return;
    }

    this.cartService.addItemToCart(product, this.selectedSize);

    // Thông báo thay đổi đến các thành phần đang nghe
    this.cartService.cartItemsSubject.next(this.cartService._cartItems);

    // Kiểm tra xem toastController đã được khởi tạo
    if (this.toastController) {
      const toast = await this.toastController.create({
        message: 'Sản phẩm đã được thêm vào giỏ hàng.',
        duration: 2000, // Thời gian hiển thị (ms)
        position: 'top', // Vị trí hiển thị
        color: 'primary'
      });
      await toast.present();
    } else {
      console.error('toastController is undefined');
    }
  }

  // Hàm này tính toán và trả về một mảng số nguyên tương ứng với số sao đánh giá.
  getStars(rating: any): number[] {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      // Nếu i nhỏ hơn hoặc bằng giá trị đánh giá, thêm 1 vào mảng (ngôi sao đầy)
      // Ngược lại, thêm 0 vào mảng (ngôi sao trống)
      stars.push(i <= rating ? 1 : 0);
    }
    return stars;
  }

}
