import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiliPageComponent } from './profili-page.component';

describe('ProfiliPageComponent', () => {
  let component: ProfiliPageComponent;
  let fixture: ComponentFixture<ProfiliPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfiliPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfiliPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
