import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepiePageComponent } from './recepie-page.component';

describe('RecepiePageComponent', () => {
  let component: RecepiePageComponent;
  let fixture: ComponentFixture<RecepiePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepiePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepiePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
