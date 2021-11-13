import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortletPatentiComponent } from './portlet-patenti.component';

describe('PortletPatentiComponent', () => {
  let component: PortletPatentiComponent;
  let fixture: ComponentFixture<PortletPatentiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortletPatentiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortletPatentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
