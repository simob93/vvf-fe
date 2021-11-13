import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormServizioComponent } from './form-servizio.component';

describe('FormServizioComponent', () => {
  let component: FormServizioComponent;
  let fixture: ComponentFixture<FormServizioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormServizioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormServizioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
