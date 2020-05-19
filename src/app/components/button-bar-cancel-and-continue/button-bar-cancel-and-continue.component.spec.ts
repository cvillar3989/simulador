import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBarCancelAndContinueComponent } from './button-bar-cancel-and-continue.component';

describe('ButtonBarCancelAndContinueComponent', () => {
  let component: ButtonBarCancelAndContinueComponent;
  let fixture: ComponentFixture<ButtonBarCancelAndContinueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonBarCancelAndContinueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonBarCancelAndContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
