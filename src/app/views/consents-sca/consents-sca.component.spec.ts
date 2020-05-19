import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsentsSCAComponent } from './consents-sca.component';

describe('ConsentsSCAComponent', () => {
  let component: ConsentsSCAComponent;
  let fixture: ComponentFixture<ConsentsSCAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsentsSCAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsentsSCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
