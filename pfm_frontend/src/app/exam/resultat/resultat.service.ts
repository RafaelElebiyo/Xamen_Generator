import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ResultatService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'http://localhost:8080/resultats';

  getResultatsByExam(examId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/exam/${examId}`);
  }

  getResultatByExamAndEtudiant(examId: number, etudiantId: number) {
    return this.http.get<any>(`${this.baseUrl}/exam/${examId}/etudiant/${etudiantId}`);
  }
  createResultat(resultatData: any): Observable<any> {
      return this.http.post(this.baseUrl, resultatData);
    }

}