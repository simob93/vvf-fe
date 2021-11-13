import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormProfiliComponent } from './form-profili.component';

describe('FormProfiliComponent', () => {
  let component: FormProfiliComponent;
  let fixture: ComponentFixture<FormProfiliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormProfiliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProfiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
