import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ProductModel} from "../../models/product-model";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
 
  // filteredProducts: ProductModel[] = [];
  
  constructor(private productService: ProductService) { }

  ngOnInit() {
  }

}