import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScadenzaArticoliListComponent } from './scadenza-articoli-list.component';

describe('ScadenzaArticoliListComponent', () => {
  let component: ScadenzaArticoliListComponent;
  let fixture: ComponentFixture<ScadenzaArticoliListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScadenzaArticoliListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScadenzaArticoliListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
