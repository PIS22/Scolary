import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupeMatiereComponent } from './groupe-matiere.component';

describe('GroupeMatiereComponent', () => {
  let component: GroupeMatiereComponent;
  let fixture: ComponentFixture<GroupeMatiereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupeMatiereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupeMatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
