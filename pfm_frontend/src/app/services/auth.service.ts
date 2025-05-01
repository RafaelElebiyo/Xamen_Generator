// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Professor } from '../models/professor.model';
import { Etudiant } from '../models/etudiant.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private PROFESSOR_KEY = 'currentProfessor';
  private ETUDIANT_KEY = 'currentEtudiant';

  constructor(private http: HttpClient) {}

  loginProfessor(email: string, password: string): Observable<Professor> {
    return this.http.post<Professor>('http://localhost:8080/professors/login', { email, password }).pipe(
      tap(professor => {
        if (professor) {
          localStorage.setItem(this.PROFESSOR_KEY, JSON.stringify(professor));
          localStorage.removeItem(this.ETUDIANT_KEY);
        }
      })
    );
  }

  loginEtudiant(email: string): Observable<Etudiant> {
    return this.http.post<Etudiant>('http://localhost:8080/etudiants/login', { email }).pipe(
      tap(etudiant => {
        if (etudiant) {
          localStorage.setItem(this.ETUDIANT_KEY, JSON.stringify(etudiant));
          localStorage.removeItem(this.PROFESSOR_KEY);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.PROFESSOR_KEY);
    localStorage.removeItem(this.ETUDIANT_KEY);
  }

  getCurrentProfessor(): Professor | null {
    const professor = localStorage.getItem(this.PROFESSOR_KEY);
    return professor ? JSON.parse(professor) : null;
  }

  getCurrentEtudiant(): Etudiant | null {
    const etudiant = localStorage.getItem(this.ETUDIANT_KEY);
    return etudiant ? JSON.parse(etudiant) : null;
  }

  isProfessorLoggedIn(): boolean {
    return !!this.getCurrentProfessor();
  }

  isEtudiantLoggedIn(): boolean {
    return !!this.getCurrentEtudiant();
  }
}