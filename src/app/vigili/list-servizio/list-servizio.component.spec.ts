import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListServizioComponent } from './list-servizio.component';

describe('ListServizioComponent', () => {
  let component: ListServizioComponent;
  let fixture: ComponentFixture<ListServizioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListServizioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListServizioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
