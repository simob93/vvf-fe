import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPermessoComponent } from './edit-permesso.component';

describe('EditPermessoComponent', () => {
  let component: EditPermessoComponent;
  let fixture: ComponentFixture<EditPermessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPermessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPermessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
