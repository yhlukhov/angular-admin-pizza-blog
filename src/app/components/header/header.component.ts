import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/shared/interfaces/product.interface';
import { OrderService } from '../../../shared/services/order.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  totalPrice = 0
  private basket:Array<IProduct>
  constructor(private ordService:OrderService) { }

  ngOnInit(): void {
    this.getLocalStorage()
    this.subscribeBasket()
  }

  private subscribeBasket() {
    this.ordService.basket.subscribe(()=>{
      this.getLocalStorage()
    })
  }
  private getLocalStorage() {
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      const localProducts = JSON.parse(localStorage.getItem('myOrder'))
      this.totalPrice = localProducts.reduce((total, prod) => {
        return total + prod.count*prod.price
      }, 0)
    }
    else this.totalPrice = 0
  }
}
