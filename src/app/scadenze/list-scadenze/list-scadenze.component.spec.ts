import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScadenzeComponent } from './list-scadenze.component';

describe('ListScadenzeComponent', () => {
  let component: ListScadenzeComponent;
  let fixture: ComponentFixture<ListScadenzeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListScadenzeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListScadenzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
