import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypFormComponent } from './typ-form.component';

describe('TypFormComponent', () => {
  let component: TypFormComponent;
  let fixture: ComponentFixture<TypFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
