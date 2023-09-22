import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { ProductModel } from "../../models/product-model";
import { IonicModule, LoadingController } from "@ionic/angular";
import { BannerComponent } from '../../components/banner/banner.component';
import {  HeaderComponent} from '../../components/header/header.component';
import { Router } from '@angular/router';
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonicModule, BannerComponent,HeaderComponent]
})
export class HomePage implements OnInit {

    listArrayOfProducts: ProductModel[] = [];
    displayedList: ProductModel[] = [];

    constructor(private productService: ProductService,
        private loadingController: LoadingController) {
    }

    ngOnInit(): void { }

}