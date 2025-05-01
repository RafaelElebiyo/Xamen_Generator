// src/app/etudiant/etudiant-login/etudiant-login.component.ts
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etudiant-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './etudiant-login.component.html',
  styleUrls: ['./etudiant-login.component.css']
})
export class EtudiantLoginComponent {
  email: string = '';
  errorMessage: string = '';

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    this.authService.loginEtudiant(this.email).subscribe({
      next: () => {
        this.activeModal.close();
        this.router.navigate(['/exam/' + this.authService.getCurrentEtudiant()?.id]);
      },
      error: (err) => {
        this.errorMessage = 'Email incorrect ou étudiant non trouvé';
      }
    });
  }
}