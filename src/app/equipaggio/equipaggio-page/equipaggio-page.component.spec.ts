import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipaggioPageComponent } from './equipaggio-page.component';

describe('EquipaggioPageComponent', () => {
  let component: EquipaggioPageComponent;
  let fixture: ComponentFixture<EquipaggioPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipaggioPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipaggioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
