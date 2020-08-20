import { Component, OnInit, Input } from '@angular/core';
import { IProduct } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-count',
  templateUrl: './product-count.component.html',
  styleUrls: ['./product-count.component.scss']
})
export class ProductCountComponent implements OnInit {
  @Input() product: IProduct

  constructor() { }

  ngOnInit(): void {
  }

  increase(sign) {
    if(sign === '+') this.product.count++
    else if (this.product.count > 1) this.product.count--
  }
}
