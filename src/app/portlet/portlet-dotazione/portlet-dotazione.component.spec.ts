import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortletDotazioneComponent } from './portlet-dotazione.component';

describe('PortletDotazioneComponent', () => {
  let component: PortletDotazioneComponent;
  let fixture: ComponentFixture<PortletDotazioneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortletDotazioneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortletDotazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
