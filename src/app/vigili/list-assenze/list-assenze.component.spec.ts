import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssenzeComponent } from './list-assenze.component';

describe('ListAssenzeComponent', () => {
  let component: ListAssenzeComponent;
  let fixture: ComponentFixture<ListAssenzeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAssenzeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssenzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
