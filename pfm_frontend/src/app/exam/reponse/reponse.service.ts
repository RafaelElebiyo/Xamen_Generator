import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/reponses';

  getReponseByQuestionAndEtudiant(questionId: number, etudiantId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/question/${questionId}/etudiant/${etudiantId}`);
  }

  createReponse(reponseData: any): Observable<any> {
    return this.http.post(this.baseUrl, reponseData);
  }
}