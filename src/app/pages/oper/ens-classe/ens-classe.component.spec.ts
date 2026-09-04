import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsClasseComponent } from './ens-classe.component';

describe('EnsClasseComponent', () => {
  let component: EnsClasseComponent;
  let fixture: ComponentFixture<EnsClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnsClasseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnsClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
