import { HomePage } from './../pages/home/home.page';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeReferenceService } from '../services/home-reference.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {

  isNikeMenuOpen = false;
  isAdidasMenuOpen = false;
  isJordanMenuOpen = false;

  constructor(private router: Router, private homeRefService: HomeReferenceService) {}

  // NIKE
  switchToNikeMaleData() {
    // Điều hướng đến trang "home"
    this.router.navigateByUrl('/home').then(() => {
      // Lấy tham chiếu đến trang "home" từ dịch vụ và gọi hàm loadDataNikeMale()
      const homePageReference = this.homeRefService.getHomePageReference();
      if (homePageReference) {
        homePageReference.loadDataNikeMale();
        homePageReference.useLoadMoreDataNike="NIKE_MALE";
      }
    });
  }
  switchToNikeFemaleData() {
    // Điều hướng đến trang "home"
    this.router.navigateByUrl('/home').then(() => {
      // Lấy tham chiếu đến trang "home" từ dịch vụ và gọi hàm loadDataNikeMale()
      const homePageReference = this.homeRefService.getHomePageReference();
      if (homePageReference) {
        homePageReference.loadDataNikeFemale();
        homePageReference.useLoadMoreDataNike="NIKE_FEMALE";
      }
    });
  }
  //ADIDAS
  switchToAdidasMaleData() {
    // Điều hướng đến trang "home"
    this.router.navigateByUrl('/home').then(() => {
      // Lấy tham chiếu đến trang "home" từ dịch vụ và gọi hàm loadDataNikeMale()
      const homePageReference = this.homeRefService.getHomePageReference();
      if (homePageReference) {
        homePageReference.loadDataAdidasMale();
        homePageReference.useLoadMoreDataNike="ADIDAS_MALE";
      }
    });
  }
  switchToAdidasFemaleData() {
    // Điều hướng đến trang "home"
    this.router.navigateByUrl('/home').then(() => {
      // Lấy tham chiếu đến trang "home" từ dịch vụ và gọi hàm loadDataNikeMale()
      const homePageReference = this.homeRefService.getHomePageReference();
      if (homePageReference) {
        homePageReference.loadDataAdidasFemale();
        homePageReference.useLoadMoreDataNike="ADIDAS_FEMALE";
      }
    });
  }
  //JORDAN
  switchToJordanMaleData() {
    // Điều hướng đến trang "home"
    this.router.navigateByUrl('/home').then(() => {
      // Lấy tham chiếu đến trang "home" từ dịch vụ và gọi hàm loadDataNikeMale()
      const homePageReference = this.homeRefService.getHomePageReference();
      if (homePageReference) {
        homePageReference.loadDataJordanMale();
        homePageReference.useLoadMoreDataNike="JORDAN_MALE";
      }
    });
  }
  switchToJordanFemaleData() {
    // Điều hướng đến trang "home"
    this.router.navigateByUrl('/home').then(() => {
      // Lấy tham chiếu đến trang "home" từ dịch vụ và gọi hàm loadDataNikeMale()
      const homePageReference = this.homeRefService.getHomePageReference();
      if (homePageReference) {
        homePageReference.loadDataJordanFemale();
        homePageReference.useLoadMoreDataNike="JORDAN_FEMALE";
      }
    });
  }

}
