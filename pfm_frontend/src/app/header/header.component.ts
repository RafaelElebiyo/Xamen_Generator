import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfessorLoginComponent } from '../professor/professor-login/professor-login.component';
import { ContactComponent } from '../contact/contact.component';
import { RegisterComponent } from '../professor/register/register.component';
import { Router } from '@angular/router';
import { FormComponent } from '../exam/form/form.component';
import { FormEtudiantComponent } from '../etudiant/form-etudiant/form-etudiant.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  professorName: string = '';
  professorId: number | null = null;

  constructor(
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkAuthStatus();
    this.setupStorageListener();
  }

  private checkAuthStatus(): void {
    try {
      const professorData = localStorage.getItem('currentProfessor');
      
      if (professorData) {
        const professor = JSON.parse(professorData);
        
        if (professor?.nom && professor?.id) {
          this.isLoggedIn = true;
          this.professorName = professor.nom;
          this.professorId = professor.id;
        } else {
          this.clearAuthData();
        }
      }
    } catch (error) {
      console.error('Error parsing professor data:', error);
      this.clearAuthData();
    }
  }

  private setupStorageListener(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'currentProfessor') {
        this.checkAuthStatus();
      }
    });
  }

  private clearAuthData(): void {
    this.isLoggedIn = false;
    this.professorName = '';
    this.professorId = null;
  }

  openLoginProf(): void {
    const modalRef = this.modalService.open(ProfessorLoginComponent, {
      backdrop: 'static'
    });

    modalRef.result.then(
      () => this.checkAuthStatus(),
      () => {} // Ignora el rechazo del modal
    );
  }

  openRegisterProf(): void {
    const modalRef = this.modalService.open(RegisterComponent, {
      backdrop: 'static'
    });

    modalRef.result.then(
      () => this.checkAuthStatus(),
      () => {}
    );
  }

  logout(): void {
    localStorage.removeItem('currentProfessor');
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  openContact(): void {
    this.modalService.open(ContactComponent, {
      centered: true,
      size: 'lg',
      backdrop: 'static'
    });
  }

  openExamenForm(): void {
    if (!this.isLoggedIn) {
      this.openLoginProf();
      return;
    }

    this.modalService.open(FormComponent, {
      centered: true,
      size: 'xl',
      backdrop: 'static'
    });
  }

  openEtudiantForm(): void {
    if (!this.isLoggedIn) {
      this.openLoginProf();
      return;
    }

    this.modalService.open(FormEtudiantComponent, {
      backdrop: 'static'
    });
  }

  openEtudiantList(): void {
    if (!this.isLoggedIn) {
      this.openLoginProf();
      return;
    }

    this.router.navigate(['/etudiants']);
  }

  openExamenList(): void {
    if (!this.isLoggedIn) {
      this.openLoginProf();
      return;
    }

    this.router.navigate(['/examens']);
  }

  accueil(): void {
    this.router.navigate(['/']);
  }
}