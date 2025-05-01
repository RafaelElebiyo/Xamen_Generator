import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  private http = inject(HttpClient);
  private backEndUrl = 'http://localhost:8080/etudiants';

  getAllEtudiants() {
    return this.http.get<any[]>(this.backEndUrl);
  }

  getEtudiantById(id: number) {
    return this.http.get<any>(`${this.backEndUrl}/${id}`);
  }

  createEtudiant(etudiant: any) {
    return this.http.post<any>(this.backEndUrl, etudiant);
  }

  updateEtudiant(id: number, etudiant: any) {
    return this.http.put<any>(`${this.backEndUrl}/${id}`, etudiant);
  }

  deleteEtudiant(id: number) {
    return this.http.delete(`${this.backEndUrl}/${id}`);
  }
}