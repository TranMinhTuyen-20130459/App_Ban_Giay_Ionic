import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { OrderModel } from 'src/app/models/order-model';
import { AddressService } from 'src/app/services/address.service';
import { CartService } from 'src/app/services/cart.service';
import { NetworkService } from 'src/app/services/network.service';
import { OrderService } from 'src/app/services/order.service';
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
    private utilService: UtilService,
    private orderService: OrderService,
    private alertController: AlertController,
    private router: Router) {

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
      address: new FormControl('', [Validators.required]),
      province: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      ward: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    // Gọi API lấy danh sách Tỉnh/Thành 
    this.dataAddressService.GetProvinceData().subscribe((data: any[]) => {
      this.provinceData = data;
      // console.log(this.provinceData);
    });

    // Lắng nghe sự thay đổi của Tổng giá trị trong giỏ hàng
    this.cartService.totalPriceSubject.subscribe((totalPriceInCart: number) => {
      this.order_value = totalPriceInCart;
      this.total_price = this.order_value + this.ship_price;
    });

  }

  onProvinceChange(e: any) {

    const selectedProvinceValue = e.detail.value;
    // console.log('Province Code: ' + selectedProvinceValue.code + '\n' + 'Province Name: ' + selectedProvinceValue.name);

    this.districtData = [];
    this.wardData = [];

    this.province_name = selectedProvinceValue.name;

    this.dataAddressService.GetDistrictData(selectedProvinceValue.code).subscribe((data: any) => {
      this.districtData = data.districts;
      // console.log(this.districtData);
    })
  }

  onDistrictChange(e: any) {
    const selectedDistrictValue = e.detail.value;
    // console.log('District Code: ' + selectedDistrictValue.code + '\n' + 'District Name: ' + selectedDistrictValue.name);

    this.district_name = selectedDistrictValue.name;

    this.dataAddressService.GetWardData(selectedDistrictValue.code).subscribe((data: any) => {
      this.wardData = data.wards;
      // console.log(this.wardData);
    })
  }

  onWardChange(e: any) {

    const selectedWardValue = e.detail.value;
    this.ward_name = selectedWardValue.name;
    // console.log(this.ward_name);

  }

  createOrder(): void {

    if (this.orderForm.valid) {

      // Lấy dữ liệu từ các FormControl
      this.name_customer = this.orderForm.get('name_customer')?.value;
      // console.log('Name Customer: ' + this.name_customer);

      this.phone_customer = this.orderForm.get('phone')?.value;
      // console.log('Phone_Customer: ' + this.phone_customer);

      this.email_customer = this.orderForm.get('email')?.value;
      // console.log('Email Customer: ' + this.email_customer);

      this.address = this.orderForm.get('address')?.value;
      // console.log('Address: ' + this.address);

      this.province_name = this.orderForm.get('province')?.value.name;
      // console.log('Province Name: ' + this.province_name);

      this.district_name = this.orderForm.get('district')?.value.name;
      // console.log('District Name: ' + this.district_name);

      this.ward_name = this.orderForm.get('ward')?.value.name;
      // console.log('Ward Name: ' + this.ward_name);

      this.province_id = this.orderForm.get('province')?.value.code;
      // console.log('Province Id: ' + this.province_id);

      this.district_id = this.orderForm.get('district')?.value.code;
      // console.log('District Id: ' + this.district_id);

      this.ward_id = this.orderForm.get('ward')?.value.code;
      // console.log('Ward Id: ' + this.ward_id);

      const orderData: OrderModel = {

        name_customer: this.name_customer,
        phone: this.phone_customer,
        email_customer: this.email_customer,

        to_address: {
          address: this.address,
          province_name: this.province_name,
          district_name: this.district_name,
          ward_name: this.ward_name,
          province_id: this.province_id + "",
          district_id: this.district_id + "",
          ward_id: this.ward_id + ""
        },

        note: "",
        ship_price: this.ship_price,
        order_value: this.order_value,

        list_order_detail: this.cartService._cartItems.map((cartItem) => ({
          id_product: cartItem.product.id_product,
          name_size: cartItem.name_size,
          quantity: cartItem.quantity,
          price: cartItem.price
        }))
      };

      this.orderService.CreateOrder(orderData).subscribe(
        (response) => {
          if (response && response.id_order) {
            const idOrder = response.id_order;
            console.log('Đã tạo đơn hàng thành công. ID đơn hàng:', idOrder);
            this.showSuccessAlert();
          } else {
            console.error('Lỗi: Không có ID đơn hàng trong phản hồi.');
            this.showErrorAlert();
          }
        },
        (error) => {
          console.error('Lỗi khi gọi API:', error);
          this.showErrorAlert();
        }
      );

    } else {
      this.showErrorAlert();
    }
  }

  // hiển thị cửa sổ thông báo khi thêm đơn hàng "Thành Công"
  async showSuccessAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Thành Công',
      message: 'Đã thêm đơn hàng thành công!',
      buttons: [{

        text: 'OK',
        handler: () => {
          // Xóa dữ liệu giỏ hàng trong localStorage
          localStorage.removeItem('carts');

          // Reset _cartItems bằng cách gán nó thành một mảng rỗng []
          this.cartService._cartItems = [];

          // Cập nhật giỏ hàng trong CartService (nếu cần)
          this.cartService._totalPrice = 0;

          // Cập nhật BehaviorSubject để thông báo sự thay đổi trong giỏ hàng
          this.cartService.cartItemsSubject.next(this.cartService._cartItems);
          this.cartService.totalPriceSubject.next(this.cartService._totalPrice);

          // Sau khi xóa dữ liệu giỏ hàng, chuyển hướng đến trang /home
          this.router.navigate(['/home']);

        }
      }],
      cssClass: 'success-alert', // Thêm một lớp CSS tùy chỉnh nếu cần thiết
      backdropDismiss: false // Ngăn người dùng đóng cửa sổ bằng cách nhấp vào nền
    });

    await alert.present();
  }

  // hiển thị cửa sổ thông báo khi thêm đơn hàng "Thất Bại"
  async showErrorAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Thất Bại',
      message: 'Thêm đơn hàng thất bại. Vui lòng thử lại sau.',
      buttons: ['OK'],
      cssClass: 'error-alert', // Thêm một lớp CSS tùy chỉnh nếu cần thiết
      backdropDismiss: false // Ngăn người dùng đóng cửa sổ bằng cách nhấp vào nền
    });

    await alert.present();
  }
}