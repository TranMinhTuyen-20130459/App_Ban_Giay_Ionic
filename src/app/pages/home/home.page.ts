import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from "@ionic/angular";
import { ProductModel } from "../../models/product-model";
import { ProductService } from "../../services/product.service";
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

    listArrayOfProducts: ProductModel[] = [];
    displayedList: ProductModel[] = [];

    currentPage = 1;

    constructor(private productService: ProductService,
        private loadingController: LoadingController,
        private toastController: ToastController) {

        this.loadMoreData(null).then();
    }

    async ngOnInit() {

        console.log(this.displayedList);

        const loader = await this.loadingController.create({
            message: 'Danh sách sản phẩm ..',
            spinner: "bubbles",
            animated: true
        });
        await loader.present().then();

        this.productService.GetNewProducts(1, 15).subscribe(async (products: ProductModel[]) => {

            await loader.dismiss().then();
            this.listArrayOfProducts = products;
            console.log('Danh sách sản phẩm All');
            console.log(this.listArrayOfProducts);

            this.displayedList = [...this.listArrayOfProducts];

            console.log('Danh sách sản phẩm sẽ được hiển thị');
            console.log(this.displayedList);

        }, async (err) => {
            await loader.dismiss().then();
            console.log(err);
        })

    }

    async loadMoreData(ev: any) {
        const toast = await this.toastController.create({
            message: 'No More Products',
            animated: true,
            duration: 2000,
            buttons: [
                {
                    text: 'Done',
                    role: 'cancel',
                    icon: 'close'
                }
            ]
        });

        if (ev == null) {
            this.currentPage = 1;
        } else {
            this.currentPage++;
            this.productService.GetNewProducts(this.currentPage, 15).subscribe(async (prods: ProductModel[]) => {
                this.listArrayOfProducts = this.listArrayOfProducts.concat(prods);
                this.displayedList = [...this.listArrayOfProducts];

                if (ev !== null) {
                    ev.target.complete();
                }

                if (prods.length < 15) {
                    await toast.present().then();
                    ev.target.disabled = true;
                }

            }, (err: any) => {
                console.log(err);
            });

        }
    }

}