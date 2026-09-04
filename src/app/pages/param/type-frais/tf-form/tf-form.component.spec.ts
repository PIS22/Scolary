import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TfFormComponent } from './tf-form.component';

describe('TfFormComponent', () => {
  let component: TfFormComponent;
  let fixture: ComponentFixture<TfFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TfFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TfFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
