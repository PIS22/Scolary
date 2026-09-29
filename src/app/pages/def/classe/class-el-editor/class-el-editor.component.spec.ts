import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassElEditorComponent } from './class-el-editor.component';

describe('ClassElEditorComponent', () => {
  let component: ClassElEditorComponent;
  let fixture: ComponentFixture<ClassElEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassElEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassElEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
