import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepiesListComponent } from './recepies-list.component';

describe('RecepiesListComponent', () => {
  let component: RecepiesListComponent;
  let fixture: ComponentFixture<RecepiesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepiesListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
