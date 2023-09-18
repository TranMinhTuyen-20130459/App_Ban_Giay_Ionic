import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { ProductModel } from "../../models/product-model";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchedProducts: ProductModel[] = [];

  showSkeleton : boolean = false;
  touched : boolean = false; 

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

  search(ev: any): void {
    const keyword: string = ev.target.value;

    // Kiểm tra xem từ khóa có giá trị không trước khi gửi yêu cầu
    if (keyword.trim() !== '') {
      this.touched = false;
      this.searchedProducts = [];
      this.showSkeleton = true;

      // Gọi phương thức SearchProducts từ ProductService
      this.productService.SearchProducts(keyword).subscribe(
        (products: ProductModel[]) => {
          // Lấy danh sách sản phẩm tìm kiếm được và gán vào searchedProducts
          this.searchedProducts = products;
          // Tắt hiệu ứng skeleton loading
          console.log(this.searchedProducts)
          this.showSkeleton = false;
        },
        (error) => {
          console.error('Error searching for products:', error);
          this.showSkeleton = false;
          // Xử lý lỗi nếu cần
        }
      );
    } else {
      // Nếu từ khóa trống, hiển thị thông báo "Không tìm thấy sản phẩm"
      this.touched = true;
      this.showSkeleton = false;
    }
  }

}