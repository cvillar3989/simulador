import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SVASCAComponent } from './sva-sca.component';

describe('SVASCAComponent', () => {
  let component: SVASCAComponent;
  let fixture: ComponentFixture<SVASCAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SVASCAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SVASCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
