import { Component, OnInit } from '@angular/core';
import { ProductService } from "../services/product.service";
import { ProductModel } from "../models/product-model";
import { IonicModule, LoadingController } from "@ionic/angular";
import { BannerComponent } from './banner/banner.component';
import { Router } from '@angular/router';
@Component({
    selector: 'app-tab1',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonicModule, BannerComponent]
})
export class HomePage implements OnInit {

    listArrayOfProducts: ProductModel[] = [];
    displayedList: ProductModel[] = [];

    constructor(private productService: ProductService,
        private loadingController: LoadingController, private router: Router) {
    }

    navigateToSearch() {
        this.router.navigate(['/search']);
    }

    ngOnInit(): void { }

}