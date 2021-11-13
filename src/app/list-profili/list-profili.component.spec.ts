import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfiliComponent } from './list-profili.component';

describe('ListProfiliComponent', () => {
  let component: ListProfiliComponent;
  let fixture: ComponentFixture<ListProfiliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProfiliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProfiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
