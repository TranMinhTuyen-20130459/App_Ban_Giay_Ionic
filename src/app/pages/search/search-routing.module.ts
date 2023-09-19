import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchPage } from './search.page';
import { ProductResolverService } from 'src/app/services/product-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: SearchPage
  },
  {
    path: 'prod-detail/:id',
    loadChildren: () => import('../prod-detail/prod-detail.module').then( m => m.ProdDetailPageModule),
    resolve: {product: ProductResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchPageRoutingModule {}
