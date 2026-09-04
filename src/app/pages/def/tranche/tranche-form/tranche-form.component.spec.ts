import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrancheFormComponent } from './tranche-form.component';

describe('TrancheFormComponent', () => {
  let component: TrancheFormComponent;
  let fixture: ComponentFixture<TrancheFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrancheFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrancheFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
