import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositiListComponent } from './depositi-list.component';

describe('DepositiListComponent', () => {
  let component: DepositiListComponent;
  let fixture: ComponentFixture<DepositiListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositiListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositiListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
