import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisFormComponent } from './frais-form.component';

describe('FraisFormComponent', () => {
  let component: FraisFormComponent;
  let fixture: ComponentFixture<FraisFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraisFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FraisFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
