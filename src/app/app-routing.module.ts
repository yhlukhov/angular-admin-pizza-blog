import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BlogsComponent } from './blogs/blogs.component';
import { ProductsComponent } from './products/products.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { ProductComponent } from './admin/product/product.component';
import { CategoryComponent } from './admin/category/category.component';
import { BlogComponent } from './admin/blog/blog.component';
import { DiscountComponent } from './admin/discount/discount.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BasketComponent } from './basket/basket.component';

const routes: Routes = [
  // { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'discounts', component: DiscountsComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'menu/:category', component: ProductsComponent },
  { path: 'menu/:category/:id', component: ProductDetailsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: '', redirectTo: 'category', pathMatch: 'full'},
    { path: 'product', component: ProductComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'discount', component: DiscountComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'blog', component: BlogComponent },
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
