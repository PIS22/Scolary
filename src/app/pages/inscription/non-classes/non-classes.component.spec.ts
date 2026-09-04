import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonClassesComponent } from './non-classes.component';

describe('NonClassesComponent', () => {
  let component: NonClassesComponent;
  let fixture: ComponentFixture<NonClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NonClassesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
