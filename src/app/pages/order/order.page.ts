import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerModel } from 'src/app/models/customer-model';
import { CityData } from 'src/app/models/district-model';
import { ProductModel } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor(public cartService: CartService, private dataService: DataService) {
  }
  selectedProvince: any;
  nameProvince: any;
  selectedDistric: any;
  selectedCommue: any;
  provenceData: any[] | undefined;
  districtData: any[] | undefined;
  communeData: any[] | undefined;

  isPersonalUp: boolean = false;
  isBillingUp: boolean = false;
  isShippingUp: boolean = false;
  isPaymentUp: boolean = false;
  sameShipping: boolean = false;
  paymentGateway: PaymentGateway[] = [];
  subTotal = 0;
  cartTotal = 0;
  products: ProductModel[] = [];
  userDetails!: CustomerModel;
  taxesRate = 0;
  finalTax = 0;
  math = Math;

  ngOnInit() {
    this.dataService.getTinhThanhData().subscribe((data: any[]) => {
      this.provenceData = data;
    });

  }

  toggleUp(section: string) {

    switch (section) {
      case 'billing':
        this.isBillingUp = !this.isBillingUp;
        break;
      case 'shipping':
        this.isShippingUp = !this.isShippingUp;
        break;
      case 'payment':
        this.isPaymentUp = !this.isPaymentUp;
        break;
      default:
        this.isPersonalUp = !this.isPersonalUp;
        break;
    }
  }

  toggleShipping() {
    this.sameShipping = !this.sameShipping;
  }

  checkout(checkoutForm: NgForm) {

  }


  onProvinceChange() {
    this.dataService.getTinhThanhData().subscribe((data: any) => {

      this.nameProvince = data.find((item: CityData) => item.code === this.selectedProvince).name;
      this.districtData = data.find((item: CityData) => item.code === this.selectedProvince).districts;
      console.log(this.nameProvince)
    });
  }
  
  onDistrictChange() {
    this.dataService.getDistrictData(this.selectedProvince).subscribe((data: any) => {
      if (this.districtData != undefined) {
        this.communeData = data.wards;
        console.log(this.communeData)
      }
    });

  }

}

interface PaymentGateway {
  description: string;
  enabled: boolean;
  title: string;
  id: string;
  method_description: string;
  method_title: string;
}


export interface LineItemsModel {
  product_id: number;
  quantity: number;
  variation_id?: number;
}
