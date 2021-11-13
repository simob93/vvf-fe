import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatentiCertificatiComponent } from './patenti-certificati.component';

describe('FormPatentiCertificatiComponent', () => {
  let component: PatentiCertificatiComponent;
  let fixture: ComponentFixture<PatentiCertificatiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatentiCertificatiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatentiCertificatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
