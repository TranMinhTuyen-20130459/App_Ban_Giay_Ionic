import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicSlides } from '@ionic/angular';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BannerComponent implements OnInit {

  slides: any[] = [];
  swiperModules = [IonicSlides];

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;

  constructor() { }

  ngOnInit() {
    this.slides = [
      {banner: 'assets/nike-1.png'},
      {banner: 'assets/nike-2.jpg'},
      {banner: 'assets/adidas-1.jpg'},
      {banner: 'assets/adidas-2.jpg'},
      {banner: 'assets/adidas-3.jpg'}
    ];
  }

  onSlideChange(event: any) {
    console.log(this.swiperRef?.nativeElement.swiper.activeIndex);
    console.log('event', event);
  }

}