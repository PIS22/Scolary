import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisSelectComponent } from './frais-select.component';

describe('FraisSelectComponent', () => {
  let component: FraisSelectComponent;
  let fixture: ComponentFixture<FraisSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraisSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FraisSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
