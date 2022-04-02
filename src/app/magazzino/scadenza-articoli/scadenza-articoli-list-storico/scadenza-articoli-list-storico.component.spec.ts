import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScadenzaArticoliListStoricoComponent } from './scadenza-articoli-list-storico.component';

describe('ScadenzaArticoliListStoricoComponent', () => {
  let component: ScadenzaArticoliListStoricoComponent;
  let fixture: ComponentFixture<ScadenzaArticoliListStoricoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScadenzaArticoliListStoricoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScadenzaArticoliListStoricoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
