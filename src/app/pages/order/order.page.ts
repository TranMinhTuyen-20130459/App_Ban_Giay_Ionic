import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CustomerModel } from 'src/app/models/customer-model';
import { ProductModel } from 'src/app/models/product-model';
import { CartService } from 'src/app/services/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  constructor(public cartService: CartService) {
  }

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
  IndianStates = environment.states;
  taxesRate = 0;
  finalTax = 0;
  math = Math;

  ngOnInit() {

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
