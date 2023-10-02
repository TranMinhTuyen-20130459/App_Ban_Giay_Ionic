import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CityModel } from 'src/app/models/administrative-unit-model';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { NetworkService } from 'src/app/services/network.service';
import { UtilService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  provinceData: any[] | undefined;
  districtData: any[] | undefined;
  wardData: any[] | undefined;

  name_customer: string = "";
  phone_customer: string = "";
  email_customer: string = "";
  note: string = "";
  address: string = "";
  ward_name: string = "";
  district_name: string = "";
  province_name: string = "";
  ward_id: string = "";
  district_id: string = "";
  province_id: string = "";
  ship_price: number = 0;
  order_value: number = this.cartService._totalPrice;
  total_price: number = this.ship_price + this.order_value;

  orderForm: FormGroup; // Form Đặt Hàng

  constructor(private cartService: CartService,
    private dataAddressService: AddressService,
    private networkService: NetworkService,
    private utilService: UtilService) {

    // Khởi tạo FormGroup và liên kết các FormControl với nó
    this.orderForm = new FormGroup({
      name_customer: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/), // Đảm bảo rằng số điện thoại có 10 chữ số
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      address: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {

    // Gọi API lấy danh sách Tỉnh/Thành 
    this.dataAddressService.GetProvinceData().subscribe((data: any[]) => {
      this.provinceData = data;
      console.log(this.provinceData);
    });

    // Lắng nghe sự thay đổi của Tổng giá trị trong giỏ hàng
    this.cartService.totalPriceSubject.subscribe((totalPriceInCart: number) => {
      this.order_value = totalPriceInCart;
      this.total_price = this.order_value + this.ship_price;
    });

  }

  onProvinceChange(e: any) {

    const selectedProvinceValue = e.detail.value;
    console.log('Province Code: ' + selectedProvinceValue.code + '\n' + 'Province Name: ' + selectedProvinceValue.name);

    this.districtData = [];
    this.wardData = [];

    this.dataAddressService.GetDistrictData(selectedProvinceValue.code).subscribe((data: any) => {
      this.districtData = data.districts;
      console.log(this.districtData);
    })
  }

  onDistrictChange(e: any) {
    const selectedDistrictValue = e.detail.value;
    console.log('District Code: ' + selectedDistrictValue.code + '\n' + 'District Name: ' + selectedDistrictValue.name);

    this.dataAddressService.GetWardData(selectedDistrictValue.code).subscribe((data: any) => {
      this.wardData = data.wards;
      console.log(this.wardData);
    })
  }

  createOrder(): void {
  }

  // hiển thị cửa sổ thông báo khi gọi API thêm đơn hàng vào hệ thống

  // hiển thị cửa sổ thông báo khi thêm đơn hàng "Thành Công"

  // hiển thị cửa sổ thông báo khi thêm đơn hàng "Thất Bại"

}