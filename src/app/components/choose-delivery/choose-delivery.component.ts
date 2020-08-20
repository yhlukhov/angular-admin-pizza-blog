import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-delivery',
  templateUrl: './choose-delivery.component.html',
  styleUrls: ['./choose-delivery.component.scss']
})
export class ChooseDeliveryComponent implements OnInit {
  @Output() deliveryEvent = new EventEmitter<string>();
  delivery:string
  constructor() { }

  ngOnInit(): void {
  }

  selectDelivery(value: string) {
    this.deliveryEvent.emit(value);
  }
}
