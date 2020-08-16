import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/shared/interfaces/product.interface';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product:IProduct

  constructor(
    private prodService: ProductService,
    private orderService: OrderService,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getMyProduct()
  }

  getMyProduct() {
    const id = +this.actRoute.snapshot.paramMap.get('id')
    this.prodService.getOneProduct(id).subscribe(data =>{
      this.product = data
    })
  }

  increase(sign) {
    if(sign === '+') this.product.count++
    else if (this.product.count > 1) this.product.count--
  }

  makeOrder() {
    let localProducts:Array<IProduct> = []
    if (localStorage.getItem('myOrder')) {
      localProducts = JSON.parse(localStorage.getItem('myOrder'))
      let localProduct = localProducts.find(prod => prod.id === this.product.id)
      if(localProduct) {
        localProduct.count += this.product.count
      }
      else {
        localProducts.push(this.product)
      }
    }
    else {
      localProducts.push(this.product)
    }
    localStorage.setItem('myOrder', JSON.stringify(localProducts))
    this.orderService.basket.next(this.product)
  }
}
