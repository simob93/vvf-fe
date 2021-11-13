import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurniOptStampaComponent } from './turni-stampa.component';

describe('TurniOptStampaComponent', () => {
  let component: TurniOptStampaComponent;
  let fixture: ComponentFixture<TurniOptStampaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurniOptStampaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurniOptStampaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
