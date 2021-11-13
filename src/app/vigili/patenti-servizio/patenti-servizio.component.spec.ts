import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentiServizioComponent } from './patenti-servizio.component';

describe('PatentiServizioComponent', () => {
  let component: PatentiServizioComponent;
  let fixture: ComponentFixture<PatentiServizioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentiServizioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentiServizioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
