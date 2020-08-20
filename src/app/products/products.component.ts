import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/shared/interfaces/product.interface';
import { ProductService } from 'src/shared/services/product.service';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Array<IProduct> = [];
  categoryNameUA:string
  
  constructor(
    private prodService: ProductService,
    private orderService: OrderService,
    private actRoute:ActivatedRoute,
    private router: Router) {
      this.router.events.subscribe((event:Event)=>{
        if (event instanceof NavigationEnd) {
          const categoryName = this.actRoute.snapshot.paramMap.get('category')
          this.getProducts(categoryName);
        }
      })
    }

  ngOnInit(): void {
  }

  private getProducts(categoryName:string): void {
    this.prodService.getCategoryProducts(categoryName).subscribe(data => {
      this.products = data;
      this.categoryNameUA = this.products[0]?.category.nameUA
    });
  }

  addBasket(product:IProduct) {
    this.orderService.addBasket(product)
    // product.count = 1
  }

}