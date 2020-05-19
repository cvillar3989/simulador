import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsSCAComponent } from './payments-sca.component';

describe('PaymentsSCAComponent', () => {
  let component: PaymentsSCAComponent;
  let fixture: ComponentFixture<PaymentsSCAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentsSCAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsSCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
