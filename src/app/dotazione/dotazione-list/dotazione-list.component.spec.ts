import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotazioneListComponent } from './dotazione-list.component';

describe('DotazioneListComponent', () => {
  let component: DotazioneListComponent;
  let fixture: ComponentFixture<DotazioneListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotazioneListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotazioneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
