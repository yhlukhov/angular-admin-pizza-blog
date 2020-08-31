import { Component, OnInit } from '@angular/core';
import { DiscountService } from '../../shared/services/discount.service';
import { IDiscount } from 'src/shared/interfaces/discount.interface';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss']
})
export class DiscountsComponent implements OnInit {
  discountList:Array<IDiscount> = []

  constructor(private discountService: DiscountService) { }

  ngOnInit(): void {
    this.getDiscountsList()
  }

  getDiscountsList() {
    this.discountService.getFireCloudDiscounts().subscribe(collection => {
      this.discountList = collection.map(discount => {
        const data = discount.payload.doc.data() as IDiscount
        const id = discount.payload.doc.id
        return { id, ...data }
      })
    })
  }

}
