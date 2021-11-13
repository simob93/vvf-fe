import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortletScadenzeComponent } from './portlet-scadenze.component';

describe('PortletScadenzeComponent', () => {
  let component: PortletScadenzeComponent;
  let fixture: ComponentFixture<PortletScadenzeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortletScadenzeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortletScadenzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
