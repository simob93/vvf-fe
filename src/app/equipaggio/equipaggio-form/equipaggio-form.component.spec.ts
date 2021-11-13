import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipaggioFormComponent } from './equipaggio-form.component';

describe('EquipaggioFormComponent', () => {
  let component: EquipaggioFormComponent;
  let fixture: ComponentFixture<EquipaggioFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipaggioFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipaggioFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
