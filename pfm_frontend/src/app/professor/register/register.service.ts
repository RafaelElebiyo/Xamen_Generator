// src/app/services/register.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Professor } from '../../models/professor.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8080/professors/register';

  constructor(private http: HttpClient) { }

  registerProfessor(professorData: any): Observable<Professor> {
    return this.http.post<Professor>(this.apiUrl, professorData);
  }
}