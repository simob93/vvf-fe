import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVigiliComponent } from './list-vigili.component';

describe('ListVigiliComponent', () => {
  let component: ListVigiliComponent;
  let fixture: ComponentFixture<ListVigiliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVigiliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVigiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
