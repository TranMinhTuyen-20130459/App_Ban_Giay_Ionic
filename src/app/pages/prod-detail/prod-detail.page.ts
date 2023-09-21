import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ProductDetailModel, SizeModel } from 'src/app/models/prod-detail-model';
import { ActivatedRoute, Router } from "@angular/router";
import { IonicSlides } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { CartItemModel } from 'src/app/models/cart-item-model';
@Component({
  selector: 'app-prod-detail',
  templateUrl: './prod-detail.page.html',
  styleUrls: ['./prod-detail.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProdDetailPage implements OnInit {

  product: ProductDetailModel | undefined;
  showData = false;

  selectedSize: SizeModel = { name_size: '', quantity_available: 0 };


  
 
  carts: CartItemModel[] = JSON.parse(localStorage.getItem('cart') || '[]');

  swiperModules = [IonicSlides];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      this.product = data.product;
      this.showData = true;
    });
  }

  navigateToSearch() {
    this.router.navigate(['/search']);
  }

  addToCart(product: any) {

    console.log(this.selectedSize);

    // Lưu trữ dữ liệu vào local storage
    const newCartItem: CartItemModel = {
      product: product, // Đặt thuộc tính product là đối tượng ProductDetailModel được truyền vào
      name_size: product.name_size, // Thay name_size bằng thuộc tính thực tế của product
      quantity: 1, // Số lượng ban đầu
      price: product.listed_price, // Thay price bằng thuộc tính thực tế của product
    };

    const existingCartItem = this.carts.find(item => item.product.id_product === product.id_product);

    if (existingCartItem) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng lên 1
      existingCartItem.quantity += 1;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào danh sách
      const newCartItem: CartItemModel = {
        product: product,
        name_size: this.selectedSize.name_size,
        quantity: 1, // Số lượng ban đầu là 1
        price: product.listed_price,
      };

      this.carts.push(newCartItem);
    }

    // Lưu danh sách sản phẩm đã cập nhật vào local storage
    localStorage.setItem('cart', JSON.stringify(this.carts));

    console.log(this.carts);
  }

  handleChange(e:any) {
    this.selectedSize = e.detail.value;
    
  }

}
