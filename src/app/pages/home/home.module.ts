import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { BannerComponent } from 'src/app/components/banner/banner.component';
import { HeaderComponent } from 'src/app/components/header/header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    HomePageRoutingModule,
    BannerComponent, // Khai báo BannerComponent trong module của trang HomePage
    HeaderComponent, // Khai báo HeaderComponent trong module của trang HomePage
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
