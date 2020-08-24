import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-delivery',
  templateUrl: './choose-delivery.component.html',
  styleUrls: ['./choose-delivery.component.scss']
})
export class ChooseDeliveryComponent implements OnInit {
  @Output() deliveryEvent = new EventEmitter<string>();
  @Input() deliveryInput:string
  delivery:string
  constructor() { }

  ngOnInit(): void {
    console.log(this.deliveryInput)
    this.delivery = this.deliveryInput
  }

  selectDelivery(value: string) {
    this.deliveryEvent.emit(value);
  }
}
