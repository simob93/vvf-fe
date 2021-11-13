import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMansioniComponent } from './form-mansioni.component';

describe('FormMansioniComponent', () => {
  let component: FormMansioniComponent;
  let fixture: ComponentFixture<FormMansioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormMansioniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMansioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
