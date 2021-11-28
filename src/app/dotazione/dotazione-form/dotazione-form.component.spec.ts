import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotazioneFormComponent } from './dotazione-form.component';

describe('DotazioneFormComponent', () => {
  let component: DotazioneFormComponent;
  let fixture: ComponentFixture<DotazioneFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotazioneFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotazioneFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
