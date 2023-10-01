import { HomeReferenceService } from './../../services/home-reference.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from "@ionic/angular";
import { ProductModel } from "../../models/product-model";
import { ProductService } from "../../services/product.service";
import { Network } from '@capacitor/network';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
    useLoadMoreDataNike: String = "NIKE_MALE";
    listArrayOfProducts: ProductModel[] = [];
    displayedList: ProductModel[] = [];

    currentPage = 1;

    constructor(private productService: ProductService,
        private loadingController: LoadingController,
        private toastController: ToastController,
        private homeRefService: HomeReferenceService) {

        this.loadMoreData(null).then();
    }

    async ngOnInit() {

        // Kiểm tra trạng thái kết nối mạng khi trang được tải
        this.checkNetworkStatus();

        // Đặt tham chiếu của trang "home" vào dịch vụ
        this.homeRefService.setHomePageReference(this);
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

    async checkNetworkStatus() {
        const status = await Network.getStatus();
        console.log('Trạng thái mạng:', status);

        if (status.connected === false) {
            console.log('Không có kết nối mạng');
            this.displayNetworkToast(); // Gọi hàm hiển thị Toast khi không có mạng
        } else {
            console.log('Đã kết nối lại mạng');
            // Thực hiện các xử lý khi đã kết nối lại mạng ở đây
        }
    }

    async displayNetworkToast() {
        const toast = await this.toastController.create({
            message: 'Không có kết nối mạng',
            duration: 2000, // Thời gian hiển thị Toast (2 giây)
            position: 'middle' // Vị trí hiển thị Toast
        });
        toast.present();
    }

    async loadMoreData(ev: any) {
        switch (this.useLoadMoreDataNike) {
            case "NIKE_MALE":
                this.loadMoreNikeMale(ev);
                break;
            case "NIKE_FEMALE":
                this.loadMoreNikeFemale(ev);
                break;
            case "ADIDAS_MALE":
                this.loadMoreAdidasMale(ev);
                break;
            case "ADIDAS_FEMALE":
                this.loadMoreAdidasFemale(ev);
                break;
            case "JORDAN_MALE":
                this.loadMoreJordanMale(ev);
                break;
            case "JORDAN_FEMALE":
                this.loadMoreJordanFemale(ev);
                break;
            default:
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
                break;
        }


    }
    // load thêm sp Nike_Male
    async loadMoreNikeMale(ev: any) {
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
            this.productService.GetNikeMaleProducts(this.currentPage, 15).subscribe(async (prods: ProductModel[]) => {
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
    // load sp Nike_Male
    async loadDataNikeMale() {

        console.log(this.displayedList);

        const loader = await this.loadingController.create({
            message: 'Danh sách sản phẩm ..',
            spinner: "bubbles",
            animated: true
        });
        await loader.present().then();

        this.productService.GetNikeMaleProducts(1, 15).subscribe(async (products: ProductModel[]) => {

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
    // load thêm sp Nike_Female
    async loadMoreNikeFemale(ev: any) {
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
            this.productService.GetNikeFemaleProducts(this.currentPage, 15).subscribe(async (prods: ProductModel[]) => {
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
    // load sp Nike_FeMale
    async loadDataNikeFemale() {

        console.log(this.displayedList);

        const loader = await this.loadingController.create({
            message: 'Danh sách sản phẩm ..',
            spinner: "bubbles",
            animated: true
        });
        await loader.present().then();

        this.productService.GetNikeFemaleProducts(1, 15).subscribe(async (products: ProductModel[]) => {

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
    // load thêm sp adidas_Female
    async loadMoreAdidasFemale(ev: any) {
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
            this.productService.GetAdidasFemaleProducts(this.currentPage, 15).subscribe(async (prods: ProductModel[]) => {
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
    // load sp adidas_FeMale
    async loadDataAdidasFemale() {

        console.log(this.displayedList);

        const loader = await this.loadingController.create({
            message: 'Danh sách sản phẩm ..',
            spinner: "bubbles",
            animated: true
        });
        await loader.present().then();

        this.productService.GetAdidasFemaleProducts(1, 15).subscribe(async (products: ProductModel[]) => {

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
    // load thêm sp adidas_male
    async loadMoreAdidasMale(ev: any) {
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
            this.productService.GetAdidasMaleProducts(this.currentPage, 15).subscribe(async (prods: ProductModel[]) => {
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
    // load sp Adidas_Male
    async loadDataAdidasMale() {

        console.log(this.displayedList);

        const loader = await this.loadingController.create({
            message: 'Danh sách sản phẩm ..',
            spinner: "bubbles",
            animated: true
        });
        await loader.present().then();

        this.productService.GetAdidasMaleProducts(1, 15).subscribe(async (products: ProductModel[]) => {

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
    // load thêm sp jordan_male
    async loadMoreJordanMale(ev: any) {
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
            this.productService.GetJordanMaleProducts(this.currentPage, 15).subscribe(async (prods: ProductModel[]) => {
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
    // load sp Jordan_Male
    async loadDataJordanMale() {

        console.log(this.displayedList);

        const loader = await this.loadingController.create({
            message: 'Danh sách sản phẩm ..',
            spinner: "bubbles",
            animated: true
        });
        await loader.present().then();

        this.productService.GetJordanMaleProducts(1, 15).subscribe(async (products: ProductModel[]) => {

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
    // load thêm sp jordan_female
    async loadMoreJordanFemale(ev: any) {
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
            this.productService.GetJordanFemaleProducts(this.currentPage, 15).subscribe(async (prods: ProductModel[]) => {
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
    // load sp jordan_female
    async loadDataJordanFemale() {

        console.log(this.displayedList);

        const loader = await this.loadingController.create({
            message: 'Danh sách sản phẩm ..',
            spinner: "bubbles",
            animated: true
        });
        await loader.present().then();

        this.productService.GetJordanFemaleProducts(1, 15).subscribe(async (products: ProductModel[]) => {

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
}