import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OrderService } from 'src/shared/services/order.service';
import { IProduct } from 'src/shared/interfaces/product.interface';
import { Order } from '../../shared/models/order.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  order:Array<IProduct> = []
  totalPrice = 0
  modalRef: BsModalRef
  remProd:IProduct
  delivery:string
  userName: string
  userPhone: string
  userCity: string
  userStreet: string
  userHouse: string
  userComment: string = ''
  status = 'in progress'

  constructor(private orderService:OrderService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.loadOrder()
    this.getLocalStorage()
  }

  loadOrder() {
    if(localStorage.length>0 && localStorage.getItem('myOrder'))
      this.order = JSON.parse(localStorage.getItem('myOrder'))
  }

  private getLocalStorage() {
    if (localStorage.length > 0 && localStorage.getItem('myOrder')) {
      const localProducts = JSON.parse(localStorage.getItem('myOrder'))
      this.totalPrice = localProducts.reduce((total, prod) => {
        return total + prod.count*prod.price
      }, 0)
    }
  }

  increase(product, sign) {
    let prod = this.order.find(p => p.id === product.id)
    if (sign === "+")
    prod.count++
    else if(product.count>1)
    prod.count--
    localStorage.setItem('myOrder', JSON.stringify(this.order))
    this.getLocalStorage()
    this.orderService.basket.next(product)
  }

  remove() {
    let index = this.order.findIndex(p => p.id === this.remProd.id)
    this.order.splice(index, 1)
    localStorage.setItem('myOrder', JSON.stringify(this.order))
    this.getLocalStorage()
    this.orderService.basket.next(this.remProd)
    this.modalRef.hide()
  }

  openModal(template: TemplateRef<any>, remProd:IProduct) {
    this.modalRef = this.modalService.show(template)
    this.remProd = remProd
  }

  addOrder() {
    let newOrder = new Order(
      1,
      this.userName,
      this.userPhone,
      this.userCity,
      this.userStreet,
      this.userHouse,
      this.order,
      this.totalPrice,
      this.delivery,
      new Date(),
      this.status,
      this.userComment
    );
    delete(newOrder.id)
    this.orderService.addOrder(newOrder).subscribe(data => {
      console.log(data)
    })
  }

  setDelivery(eventItem:string) {
    this.delivery = eventItem
    console.log(this.delivery)
  }
}