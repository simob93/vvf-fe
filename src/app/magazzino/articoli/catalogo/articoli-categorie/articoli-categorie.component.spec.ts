import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticoliCategorieComponent } from './articoli-categorie.component';

describe('ArticoliCategorieComponent', () => {
  let component: ArticoliCategorieComponent;
  let fixture: ComponentFixture<ArticoliCategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticoliCategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticoliCategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
