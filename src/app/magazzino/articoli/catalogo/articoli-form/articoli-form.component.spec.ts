import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticoliFormComponent } from './articoli-form.component';

describe('ArticoliFormComponent', () => {
  let component: ArticoliFormComponent;
  let fixture: ComponentFixture<ArticoliFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticoliFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticoliFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
