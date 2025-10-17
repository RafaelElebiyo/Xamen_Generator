import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtudiantLoginComponent } from './etudiant-login.component';

describe('EtudiantLoginComponent', () => {
  let component: EtudiantLoginComponent;
  let fixture: ComponentFixture<EtudiantLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtudiantLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EtudiantLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
