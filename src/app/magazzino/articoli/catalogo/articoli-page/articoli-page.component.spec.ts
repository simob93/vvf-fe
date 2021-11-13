import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticoliPageComponent } from './articoli-page.component';

describe('ArticoliPageComponent', () => {
  let component: ArticoliPageComponent;
  let fixture: ComponentFixture<ArticoliPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticoliPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticoliPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
