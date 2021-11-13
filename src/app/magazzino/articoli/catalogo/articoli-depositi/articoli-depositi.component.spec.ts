import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticoliDepositiComponent } from './articoli-depositi.component';

describe('ArticoliDepositiComponent', () => {
  let component: ArticoliDepositiComponent;
  let fixture: ComponentFixture<ArticoliDepositiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticoliDepositiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticoliDepositiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
