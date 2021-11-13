import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortletAutorizzazioniComponent } from './portlet-autorizzazioni.component';

describe('PortletAutorizzazioniComponent', () => {
  let component: PortletAutorizzazioniComponent;
  let fixture: ComponentFixture<PortletAutorizzazioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortletAutorizzazioniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortletAutorizzazioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
