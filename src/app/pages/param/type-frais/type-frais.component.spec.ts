import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeFraisComponent } from './type-frais.component';

describe('TypeFraisComponent', () => {
  let component: TypeFraisComponent;
  let fixture: ComponentFixture<TypeFraisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeFraisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeFraisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
