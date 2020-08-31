import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/shared/interfaces/product.interface';
import { ProductService } from 'src/shared/services/product.service';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { OrderService } from '../../shared/services/order.service';
import { AngularFirestore } from '@angular/fire/firestore';

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
    private router: Router,
    private firestore: AngularFirestore
    ) {
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
    // this.prodService.getCategoryProducts(categoryName).subscribe(data => {
    //   this.products = data;
    //   this.categoryNameUA = this.products[0]?.category.nameUA
    // });
    this.products = []
    this.firestore.collection('products').ref.where('category.nameEN', '==', categoryName)
      .onSnapshot(collection => {
        collection.forEach(product => {
          const data = product.data() as IProduct
          const id = product.id
          this.products.push({id, ...data})
        })
        this.categoryNameUA = this.products[0]?.category.nameUA
      })
  }

  addBasket(product:IProduct) {
    this.orderService.addBasket(product)
    // product.count = 1
  }

}