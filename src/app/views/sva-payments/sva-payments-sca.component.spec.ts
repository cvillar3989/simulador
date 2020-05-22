import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SVAPaymentsSCAComponent } from './sva-payments-sca.component';

describe('SVAPaymentsSCAComponent', () => {
  let component: SVAPaymentsSCAComponent;
  let fixture: ComponentFixture<SVAPaymentsSCAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SVAPaymentsSCAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SVAPaymentsSCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
