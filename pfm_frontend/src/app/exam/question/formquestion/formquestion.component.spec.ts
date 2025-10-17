import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormquestionComponent } from './formquestion.component';

describe('FormquestionComponent', () => {
  let component: FormquestionComponent;
  let fixture: ComponentFixture<FormquestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormquestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
