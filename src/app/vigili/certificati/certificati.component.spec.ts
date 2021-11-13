import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatiComponent } from './certificati.component';

describe('CertificatiComponent', () => {
  let component: CertificatiComponent;
  let fixture: ComponentFixture<CertificatiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
