import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAssenzeComponent } from './form-assenze.component';

describe('FormAssenzeComponent', () => {
  let component: FormAssenzeComponent;
  let fixture: ComponentFixture<FormAssenzeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAssenzeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAssenzeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
