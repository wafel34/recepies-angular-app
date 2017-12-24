import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRecepiesComponent } from './user-recepies.component';

describe('UserRecepiesComponent', () => {
  let component: UserRecepiesComponent;
  let fixture: ComponentFixture<UserRecepiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRecepiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRecepiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
