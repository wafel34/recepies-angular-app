import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepieCardComponent } from './recepie-card.component';

describe('RecepieCardComponent', () => {
  let component: RecepieCardComponent;
  let fixture: ComponentFixture<RecepieCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecepieCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecepieCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
