import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrderService } from '../../../shared/services/order.service';
import { IOrder } from '../../../shared/interfaces/order.interface';
import { Order } from '../../../shared/models/order.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderList: Array<IOrder>
  order: IOrder
  modalRef: BsModalRef
  delivery:string
  deliveryUA = {
    home: "Доставка на дом",
    driveway: "Самовивіз",
    advance: "Заздалегідь"
  }
  orderStatus: string
  orderBy = 'dateOrder'
  orderByReverse = false
  sortDown = true
  sortUp = false

  constructor(private orderService: OrderService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getOrderList()
  }

  getOrderList() {
    // this.orderService.getOrders().subscribe(data => {
    //   this.orderList = data
    // })
    this.orderService.getFBOrders().subscribe(collection => {
      this.orderList = []
      collection.forEach(order => {
        const id = order.payload.doc.id
        const data = order.payload.doc.data() as IOrder
        this.orderList.push({id, ...data})
      })
    })
  }


  selectDelivery(eventItem:string) {
    this.delivery = eventItem
  }

  saveOrderEdit() {
    this.order.delivery = this.delivery
    this.order.status = this.orderStatus
    // this.orderService.updateOrder(this.order).subscribe(()=>{
    //   console.log("update order")
    // })
    this.orderService.updateFBOrder(this.order)
    this.modalRef.hide()
  }

  hideOrder() {
    this.order.hidden = true
    // this.orderService.updateOrder(this.order).subscribe(()=>{
    //   console.log("update order")
    // })
    this.orderService.updateFBOrder(this.order)
    this.modalRef.hide()
  }

  sortBy(param) {
    this.orderBy = param
    this.orderByReverse = !this.orderByReverse
  }

  openModal(template: TemplateRef<any>, order:IOrder) {
    this.order = order
    this.delivery = order.delivery
    this.orderStatus = order.status
    this.modalRef = this.modalService.show(template);
  }

}
