import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMansioniComponent } from './list-mansioni.component';

describe('ListMansioniComponent', () => {
  let component: ListMansioniComponent;
  let fixture: ComponentFixture<ListMansioniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMansioniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMansioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
