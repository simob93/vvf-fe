import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradiComponent } from './gradi.component';

describe('GradiComponent', () => {
  let component: GradiComponent;
  let fixture: ComponentFixture<GradiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
