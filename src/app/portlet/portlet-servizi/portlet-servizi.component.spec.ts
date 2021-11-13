import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortletServiziComponent } from './portlet-servizi.component';

describe('PortletServiziComponent', () => {
  let component: PortletServiziComponent;
  let fixture: ComponentFixture<PortletServiziComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortletServiziComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortletServiziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
