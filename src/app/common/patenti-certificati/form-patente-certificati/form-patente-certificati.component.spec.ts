import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPatenteCertificatiComponent } from './form-patente-certificati.component';

describe('FormPatenteCertificatiComponent', () => {
  let component: FormPatenteCertificatiComponent;
  let fixture: ComponentFixture<FormPatenteCertificatiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPatenteCertificatiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPatenteCertificatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
