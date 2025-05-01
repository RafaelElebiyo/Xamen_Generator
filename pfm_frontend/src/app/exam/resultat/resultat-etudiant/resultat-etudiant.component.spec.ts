import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatEtudiantComponent } from './resultat-etudiant.component';

describe('ResultatEtudiantComponent', () => {
  let component: ResultatEtudiantComponent;
  let fixture: ComponentFixture<ResultatEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResultatEtudiantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultatEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
