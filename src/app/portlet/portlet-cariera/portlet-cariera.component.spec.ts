import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortletCarieraComponent } from './portlet-cariera.component';

describe('PortletCarieraComponent', () => {
  let component: PortletCarieraComponent;
  let fixture: ComponentFixture<PortletCarieraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortletCarieraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortletCarieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
