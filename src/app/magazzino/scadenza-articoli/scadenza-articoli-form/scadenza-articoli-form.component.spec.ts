import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScadenzaArticoliFormComponent } from './scadenza-articoli-form.component';

describe('ScadenzaArticoliFormComponent', () => {
  let component: ScadenzaArticoliFormComponent;
  let fixture: ComponentFixture<ScadenzaArticoliFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScadenzaArticoliFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScadenzaArticoliFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
