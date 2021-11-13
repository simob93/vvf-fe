import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormScadenzeComponent } from './form-scadenze.component';

describe('FormScadenzeComponent', () => {
  let component: FormScadenzeComponent;
  let fixture: ComponentFixture<FormScadenzeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormScadenzeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormScadenzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
