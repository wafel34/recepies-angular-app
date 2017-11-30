import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepieEditFormComponent } from './recepie-edit-form.component';

describe('RecepieEditFormComponent', () => {
  let component: RecepieEditFormComponent;
  let fixture: ComponentFixture<RecepieEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepieEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepieEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
