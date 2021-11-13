import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositiPageComponent } from './depositi-page.component';

describe('DepositiPageComponent', () => {
  let component: DepositiPageComponent;
  let fixture: ComponentFixture<DepositiPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositiPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositiPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
