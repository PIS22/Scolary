import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EleveClasseComponent } from './eleve-classe.component';

describe('EleveClasseComponent', () => {
  let component: EleveClasseComponent;
  let fixture: ComponentFixture<EleveClasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EleveClasseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EleveClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
