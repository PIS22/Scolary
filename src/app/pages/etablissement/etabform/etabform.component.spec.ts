import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtabformComponent } from './etabform.component';

describe('EtabformComponent', () => {
  let component: EtabformComponent;
  let fixture: ComponentFixture<EtabformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtabformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtabformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
