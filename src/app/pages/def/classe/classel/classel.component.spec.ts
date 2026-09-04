import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasselComponent } from './classel.component';

describe('ClasselComponent', () => {
  let component: ClasselComponent;
  let fixture: ComponentFixture<ClasselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClasselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClasselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
