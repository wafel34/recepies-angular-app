import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeEditFormComponent } from './recipe-edit-form.component';

describe('RecipeEditFormComponent', () => {
  let component: RecipeEditFormComponent;
  let fixture: ComponentFixture<RecipeEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
