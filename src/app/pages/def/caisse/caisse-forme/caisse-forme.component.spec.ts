import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaisseFormeComponent } from './caisse-forme.component';

describe('CaisseFormeComponent', () => {
  let component: CaisseFormeComponent;
  let fixture: ComponentFixture<CaisseFormeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaisseFormeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaisseFormeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
