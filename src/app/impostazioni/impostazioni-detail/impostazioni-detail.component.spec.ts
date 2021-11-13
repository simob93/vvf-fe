import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpostazioniDetailComponent } from './impostazioni-detail.component';

describe('ImpostazioniDetailComponent', () => {
  let component: ImpostazioniDetailComponent;
  let fixture: ComponentFixture<ImpostazioniDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpostazioniDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpostazioniDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
