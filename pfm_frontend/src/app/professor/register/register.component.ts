// src/app/professor/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfessorLoginComponent } from '../professor-login/professor-login.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('motDePasse')?.value === form.get('confirmPassword')?.value 
      ? null : { mismatch: true };
  }

  closeRegister() {
    this.activeModal.close();
  }

  openLogin() {
    this.activeModal.close();
    this.modalService.open(ProfessorLoginComponent, { centered: true });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    const { confirmPassword, acceptTerms, ...professorData } = this.registerForm.value;

    this.registerService.registerProfessor(professorData).subscribe({
      next: (professor) => {
        this.isLoading = false;
        this.activeModal.close();
        this.modalService.open(ProfessorLoginComponent, { centered: true });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err.error.message || 'Erreur lors de l\'inscription';
      }
    });
  }
}