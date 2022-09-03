import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutUsDesignComponent } from './about-us-design.component';

describe('AboutUsDesignComponent', () => {
  let component: AboutUsDesignComponent;
  let fixture: ComponentFixture<AboutUsDesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutUsDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutUsDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
