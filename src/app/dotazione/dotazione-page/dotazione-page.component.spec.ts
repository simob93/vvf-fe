import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotazionePageComponent } from './dotazione-page.component';

describe('EquipaggioPageComponent', () => {
  let component: DotazionePageComponent;
  let fixture: ComponentFixture<DotazionePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotazionePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotazionePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
