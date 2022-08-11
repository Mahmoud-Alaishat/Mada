import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Setting1Component } from './setting1.component';

describe('Setting1Component', () => {
  let component: Setting1Component;
  let fixture: ComponentFixture<Setting1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Setting1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Setting1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
