import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScadenzaArticoliPageComponent } from './scadenza-articoli-page.component';

describe('ScadenzaArticoliPageComponent', () => {
  let component: ScadenzaArticoliPageComponent;
  let fixture: ComponentFixture<ScadenzaArticoliPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScadenzaArticoliPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScadenzaArticoliPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
