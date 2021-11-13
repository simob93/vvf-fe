import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpostazioniFormComponent } from './impostazioni-form.component';

describe('ImpostazioniFormComponent', () => {
  let component: ImpostazioniFormComponent;
  let fixture: ComponentFixture<ImpostazioniFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImpostazioniFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpostazioniFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
