import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputWithValidTitleAndLinkComponent } from './input-with-valid-title-and-link.component';

describe('InputWithValidTitleAndLinkComponent', () => {
  let component: InputWithValidTitleAndLinkComponent;
  let fixture: ComponentFixture<InputWithValidTitleAndLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputWithValidTitleAndLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWithValidTitleAndLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
