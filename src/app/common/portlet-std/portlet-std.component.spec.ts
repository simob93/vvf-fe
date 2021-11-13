import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortletStdComponent } from './portlet-std.component';

describe('PortletStdComponent', () => {
  let component: PortletStdComponent;
  let fixture: ComponentFixture<PortletStdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortletStdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortletStdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
