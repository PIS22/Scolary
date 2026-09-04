import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisClassFormComponent } from './frais-class-form.component';

describe('FraisClassFormComponent', () => {
  let component: FraisClassFormComponent;
  let fixture: ComponentFixture<FraisClassFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraisClassFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FraisClassFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
