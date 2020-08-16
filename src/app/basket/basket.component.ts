import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/shared/services/order.service';
import { IProduct } from 'src/shared/interfaces/product.interface';
@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  order:Array<IProduct> = []
  constructor(private orderService:OrderService) { }
  ngOnInit(): void {
    this.loadOrder()
  }
  loadOrder() {
    if(localStorage.length>0 && localStorage.getItem('myOrder'))
      this.order = JSON.parse(localStorage.getItem('myOrder'))
    console.log(this.order)
  }
}