import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolloRicercaAvanzataComponent } from './protocollo-ricerca-avanzata.component';

describe('ProtocolloRicercaAvanzataComponent', () => {
  let component: ProtocolloRicercaAvanzataComponent;
  let fixture: ComponentFixture<ProtocolloRicercaAvanzataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolloRicercaAvanzataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolloRicercaAvanzataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
