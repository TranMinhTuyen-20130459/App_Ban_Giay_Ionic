import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {ProductModel} from "../models/ProductModel";
import {LoadingController} from "@ionic/angular";

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
   
  sliderImages = [
        '/assets/slide1',
        '/assets/slide2',
        '/assets/slide3',
        '/assets/slide4',
        '/assets/slide5'
    ]

  sliderOptions = {
        autoplay: {
            delay: 2000
        },
        loop: true
    }

    listArrayOfProducts: ProductModel[] = [];
    displayedList: ProductModel[] = [];


    constructor(private productService: ProductService,
                private loadingController: LoadingController) {
    }

    async ngOnInit() {
        const loader = await this.loadingController.create({
           message: 'Getting Products..',
           spinner: "bubbles",
           animated: true
        });     
    }

}