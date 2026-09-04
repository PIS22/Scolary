import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormECComponent } from './form-ec.component';

describe('FormECComponent', () => {
  let component: FormECComponent;
  let fixture: ComponentFixture<FormECComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormECComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormECComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
