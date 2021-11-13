import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipaggioListComponent } from './equipaggio-list.component';

describe('EquipaggioListComponent', () => {
  let component: EquipaggioListComponent;
  let fixture: ComponentFixture<EquipaggioListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipaggioListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipaggioListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
