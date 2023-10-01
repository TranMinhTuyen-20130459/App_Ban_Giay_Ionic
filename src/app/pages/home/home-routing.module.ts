import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ProductResolverService } from 'src/app/services/product-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'prod-detail/:id',
    loadChildren: () => import('../prod-detail/prod-detail.module').then(m => m.ProdDetailPageModule),
    resolve: { product: ProductResolverService }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
