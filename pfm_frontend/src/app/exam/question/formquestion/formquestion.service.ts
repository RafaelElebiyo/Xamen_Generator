import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormquestionService {
  private backEndUrl = 'http://localhost:8080/questions';

  constructor(private http: HttpClient) { }

  createQuestion(examId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.backEndUrl}/exam/${examId}`, formData);
  }
}