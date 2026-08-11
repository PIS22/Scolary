import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeRegComponent } from './mode-reg.component';

describe('ModeRegComponent', () => {
  let component: ModeRegComponent;
  let fixture: ComponentFixture<ModeRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModeRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
