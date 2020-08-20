import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './admin/category/category.component';
import { ProductComponent } from './admin/product/product.component';
import { BlogComponent } from './admin/blog/blog.component';
import { FilterCategoryPipe } from './admin/category/filter-category.pipe';
import { OrderModule } from 'ngx-order-pipe';
import { from } from 'rxjs';
import { DiscountComponent } from './admin/discount/discount.component';
import { FilterDiscountPipe } from './admin/discount/filter-discount.pipe';
import { NgpSortModule } from "ngp-sort-pipe";
import { ProductDetailsComponent } from './product-details/product-details.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { BasketComponent } from './basket/basket.component';
import { ProductCountComponent } from './components/product-count/product-count.component';
import { OrdersComponent } from './admin/orders/orders.component';
import { ChooseDeliveryComponent } from './components/choose-delivery/choose-delivery.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ProductComponent,
    BlogComponent,
    AboutComponent,
    AdminComponent,
    CategoryComponent,
    BlogsComponent,
    FilterCategoryPipe,
    DiscountComponent,
    FilterDiscountPipe,
    ProductDetailsComponent,
    HeaderComponent,
    FooterComponent,
    DiscountsComponent,
    BasketComponent,
    ProductCountComponent,
    OrdersComponent,
    ChooseDeliveryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ModalModule.forRoot(),
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
    HttpClientModule,
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    NgpSortModule,
    ButtonsModule.forRoot(),
    OrderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
