import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { ProductDetailModel } from 'src/app/models/prod-detail-model';
import {ActivatedRoute, Router} from "@angular/router";
import { IonicSlides } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prod-detail',
  templateUrl: './prod-detail.page.html',
  styleUrls: ['./prod-detail.page.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProdDetailPage implements OnInit {

  product: ProductDetailModel | undefined;
  showData = false;

  swiperModules = [IonicSlides];

  constructor(private route: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe((data:any) => {
      this.product = data.product;
      this.showData = true;
    });
  }

  navigateToSearch() {
    this.router.navigate(['/search']);
}

  

}
