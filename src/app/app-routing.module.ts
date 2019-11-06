import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
	{ path: '', component:HomeComponent },
	{ path: 'products', component:ProductsComponent },
	{ path: 'shop/:id', component:ShopComponent },
	// { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
