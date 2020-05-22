import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAccountsSVAComponent } from './select-account-sva.component';

describe('SelectAccountsSVAComponent', () => {
  let component: SelectAccountsSVAComponent;
  let fixture: ComponentFixture<SelectAccountsSVAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAccountsSVAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAccountsSVAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
