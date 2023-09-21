import {CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../models/product-model";
import {CartService} from "../../services/cart.service";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CartPage implements OnInit {

  constructor(private cartService: CartService) { }

  ngOnInit() {}


}