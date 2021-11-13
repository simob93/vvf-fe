import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositiFormComponent } from './depositi-form.component';

describe('DepositiFormComponent', () => {
  let component: DepositiFormComponent;
  let fixture: ComponentFixture<DepositiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
