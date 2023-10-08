import { HomePage } from './../pages/home/home.page';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeReferenceService } from '../services/home-reference.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {

  isNikeMenuOpen = false;
  isAdidasMenuOpen = false;
  isJordanMenuOpen = false;

  constructor(private router: Router,
    private homeRefService: HomeReferenceService,
    private menuCtrl: MenuController) { }

  // NIKE
  switchToNikeMaleData() {

    // Điều hướng đến trang "home"
    this.router.navigateByUrl('/home').then(() => {

      this.menuCtrl.enable(false, 'first'); // Đóng menu "Danh Mục"

      // Lấy tham chiếu đến trang "home" từ dịch vụ và gọi hàm loadDataNikeMale()
      const homePageReference = this.homeRefService.getHomePageReference();
      if (homePageReference) {
        homePageReference.loadDataNikeMale();
        homePageReference.useLoadMoreData = "NIKE_MALE";
      }

      this.menuCtrl.enable(true, 'first'); // Hiển thị menu "Danh Mục"
    });
  }
  switchToNikeFemaleData() {
    // Điều hướng đến trang "home"
    this.router.navigateByUrl('/home').then(() => {

      this.menuCtrl.enable(false, 'first'); // Đóng menu "Danh Mục"

      // Lấy tham chiếu đến trang "home" từ dịch vụ và gọi hàm loadDataNikeMale()
      const homePageReference = this.homeRefService.getHomePageReference();
      if (homePageReference) {
        homePageReference.loadDataNikeFemale();
        homePageReference.useLoadMoreData = "NIKE_FEMALE";
      }

      this.menuCtrl.enable(true, 'first'); // Hiển thị menu "Danh Mục"
    });
  }
  //ADIDAS
  switchToAdidasMaleData() {
    // Điều hướng đến trang "home"
    this.router.navigateByUrl('/home').then(() => {

      this.menuCtrl.enable(false, 'first'); // Đóng menu "Danh Mục"

      // Lấy tham chiếu đến trang "home" từ dịch vụ và gọi hàm loadDataNikeMale()
      const homePageReference = this.homeRefService.getHomePageReference();
      if (homePageReference) {
        homePageReference.loadDataAdidasMale();
        homePageReference.useLoadMoreData = "ADIDAS_MALE";
      }

      this.menuCtrl.enable(true, 'first'); // Hiển thị menu "Danh Mục"
    });
  }
  switchToAdidasFemaleData() {
    // Điều hướng đến trang "home"
    this.router.navigateByUrl('/home').then(() => {

      this.menuCtrl.enable(false, 'first'); // Đóng menu "Danh Mục"

      // Lấy tham chiếu đến trang "home" từ dịch vụ và gọi hàm loadDataNikeMale()
      const homePageReference = this.homeRefService.getHomePageReference();
      if (homePageReference) {
        homePageReference.loadDataAdidasFemale();
        homePageReference.useLoadMoreData = "ADIDAS_FEMALE";
      }

      this.menuCtrl.enable(true, 'first'); // Hiển thị menu "Danh Mục"
    });
  }
  //JORDAN
  switchToJordanMaleData() {
    // Điều hướng đến trang "home"
    this.router.navigateByUrl('/home').then(() => {

      this.menuCtrl.enable(false, 'first'); // Đóng menu "Danh Mục"

      // Lấy tham chiếu đến trang "home" từ dịch vụ và gọi hàm loadDataNikeMale()
      const homePageReference = this.homeRefService.getHomePageReference();
      if (homePageReference) {
        homePageReference.loadDataJordanMale();
        homePageReference.useLoadMoreData = "JORDAN_MALE";
      }

      this.menuCtrl.enable(true, 'first'); // Hiển thị menu "Danh Mục"
    });
  }
  switchToJordanFemaleData() {
    // Điều hướng đến trang "home"
    this.router.navigateByUrl('/home').then(() => {

      this.menuCtrl.enable(false, 'first'); // Đóng menu "Danh Mục"

      // Lấy tham chiếu đến trang "home" từ dịch vụ và gọi hàm loadDataNikeMale()
      const homePageReference = this.homeRefService.getHomePageReference();
      if (homePageReference) {
        homePageReference.loadDataJordanFemale();
        homePageReference.useLoadMoreData = "JORDAN_FEMALE";
      }

      this.menuCtrl.enable(true, 'first'); // Hiển thị menu "Danh Mục"
    });
  }

}
