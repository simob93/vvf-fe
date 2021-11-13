import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVigileComponent } from './edit-vigile.component';

describe('EditVigileComponent', () => {
  let component: EditVigileComponent;
  let fixture: ComponentFixture<EditVigileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditVigileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVigileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
