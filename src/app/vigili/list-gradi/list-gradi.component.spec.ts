import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGradiComponent } from './list-gradi.component';

describe('ListGradiComponent', () => {
  let component: ListGradiComponent;
  let fixture: ComponentFixture<ListGradiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGradiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGradiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
