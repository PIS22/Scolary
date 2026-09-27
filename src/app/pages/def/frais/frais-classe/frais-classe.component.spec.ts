import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisClasseComponent } from './frais-classe.component';

describe('FraisClasseComponent', () => {
  let component: FraisClasseComponent;
  let fixture: ComponentFixture<FraisClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraisClasseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FraisClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
