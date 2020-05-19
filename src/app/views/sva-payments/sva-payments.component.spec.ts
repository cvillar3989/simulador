import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SVAPaymentsComponent } from './sva-payments.component';

describe('SVAPaymentsComponent', () => {
  let component: SVAPaymentsComponent;
  let fixture: ComponentFixture<SVAPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SVAPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SVAPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
