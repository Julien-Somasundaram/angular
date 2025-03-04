import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatComponent } from './cat.component';

describe('QuestionComponent', () => {
  let component: CatComponent;
  let fixture: ComponentFixture<CatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatComponent]
    });
    fixture = TestBed.createComponent(CatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
