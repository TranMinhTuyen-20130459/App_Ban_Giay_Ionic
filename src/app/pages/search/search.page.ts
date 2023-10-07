import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { ProductModel } from "../../models/product-model";
import { AlertController, LoadingController } from '@ionic/angular';
import { NetworkService } from 'src/app/services/network.service';
import { SpeechRecognition } from "@capacitor-community/speech-recognition";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchedProducts: ProductModel[] = [];
  showSkeleton: boolean = false;
  touched: boolean = false;
  keyword = "";

  constructor(private productService: ProductService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private networkService: NetworkService) {
    // yêu cầu quyền ghi giọng nói người dùng
    SpeechRecognition.requestPermissions();
  }

  ngOnInit() {
  }

  // xử lí sự kiện khi người dùng nhập từ khóa vào thanh tìm kiếm
  onSearchInput(event: any) {
    const value = event.target.value;
    this.keyword = value; // Lưu giá trị tìm kiếm vào biến keyword
  }

  // bắt đầu ghi lại giọng nói của người dùng 
  async startRecognition() {

    const available = await SpeechRecognition.available();

    if (available) {
      SpeechRecognition.start({
        language: "en-US",
        prompt: "Thử nói gì đó",
        partialResults: true,
        popup: true,
      });

      SpeechRecognition.addListener("partialResults", (data: any) => {
        console.log("partialResults was fired", data.matches);
      });
    }

  }

  //xử lí sự kiện khi người dùng chọn tìm kiếm bằng microphone
  searchUseMicrophone() {
    console.log('Đây là hàm xử lí sự kiện khi người dùng chọn tìm kiếm bằng microphone');
  }

  search(ev: any): void {
    const keyword: string = ev.target.value;

    this.keyword = keyword;

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
          console.log("Danh sách sản phẩm được tìm kiếm");
          console.log(this.searchedProducts)
          this.showSkeleton = false;
        },
        (error) => {
          console.error('Error searching for products:', error);
          this.showSkeleton = false;
        }
      );
    } else {
      this.touched = true;
      this.showSkeleton = false;
    }
  }

  loadingSpinner() {
    this.loadingController.create({
      message: "Thông tin sản phẩm...",
      animated: true,
      spinner: "crescent",
      backdropDismiss: false,
      showBackdrop: true
    }).then(el => el.present());
  }

}