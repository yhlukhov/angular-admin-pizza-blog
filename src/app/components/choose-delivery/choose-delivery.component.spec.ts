import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseDeliveryComponent } from './choose-delivery.component';

describe('ChooseDeliveryComponent', () => {
  let component: ChooseDeliveryComponent;
  let fixture: ComponentFixture<ChooseDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
