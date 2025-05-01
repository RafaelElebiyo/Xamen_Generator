// src/app/professor/professor-login/professor-login.component.ts
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professor-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './professor-login.component.html',
  styleUrls: ['./professor-login.component.css']
})
export class ProfessorLoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.authService.loginProfessor(this.email, this.password).subscribe({
      next: () => {
        this.activeModal.close();
        this.router.navigate(['/examens']);
      },
      error: (err) => {
        this.errorMessage = 'Email ou mot de passe incorrect';
      }
    });
  }
}