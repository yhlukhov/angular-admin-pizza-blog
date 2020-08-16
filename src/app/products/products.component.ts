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

  productCount(prod:IProduct, val:boolean) {
    if (val) prod.count++
    else if(prod.count>1) prod.count--
  }

  addBasket(product:IProduct) {
    let localProducts:Array<IProduct> = []
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      localProducts = JSON.parse(localStorage.getItem('myOrder'))
      if(localProducts.some(prod => product.id === prod.id)) {
        const index = localProducts.findIndex(prod => prod.id === product.id)
        localProducts[index].count += product.count
      }
      else localProducts.push(product)
    }
    else {
      localProducts.push(product)
    }
    localStorage.setItem("myOrder", JSON.stringify(localProducts))
    this.orderService.basket.next(localProducts)
    product.count = 1
  }

}