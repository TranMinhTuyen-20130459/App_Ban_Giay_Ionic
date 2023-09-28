import { HomePage } from "../pages/home/home.page";
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root', // Đảm bảo dịch vụ này có thể được truy cập từ bất kỳ nơi nào trong ứng dụng
})
export class HomeReferenceService {
  private homePageReference: HomePage | undefined;

  setHomePageReference(ref: HomePage) {
    this.homePageReference = ref;
  }

  getHomePageReference() {
    return this.homePageReference;
  }
}
