import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerModel } from 'src/app/models/customer-model';
import { CityModel } from 'src/app/models/administrative-unit-model';
import { ProductModel } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';
import { AddressService } from 'src/app/services/address.service';
import { NetworkService } from 'src/app/services/network.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor(public cartService: CartService, 
    private dataAddressService: AddressService,
    private networkService: NetworkService) {
  }

  selectedProvince: any;
  nameProvince: any;
  selectedDistric: any;
  selectedCommue: any;
  provinceData: any[] | undefined;
  districtData: any[] | undefined;
  wardData: any[] | undefined;

  ngOnInit() {

    this.dataAddressService.GetProvinceData().subscribe((data: any[]) => {
      this.provinceData = data;
    });

  }

  onProvinceChange() {
    this.dataAddressService.GetProvinceData().subscribe((data: any) => {

      this.nameProvince = data.find((item: CityModel) => item.code === this.selectedProvince).name;
      this.districtData = data.find((item: CityModel) => item.code === this.selectedProvince).districts;
      console.log(this.nameProvince)
    });
  }

  onDistrictChange() {
    this.dataAddressService.GetDistrictData(this.selectedProvince).subscribe((data: any) => {
      if (this.districtData != undefined) {
        this.wardData = data.wards;
        console.log(this.wardData)
      }
    });

  }

}