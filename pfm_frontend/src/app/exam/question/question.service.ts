import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questionsUrl = 'http://localhost:8080/questions';
  questions = signal<any[]>([]);

  constructor(private http: HttpClient) { }

  getQuestionsByExamId(examId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.questionsUrl}/exam/${examId}`);
  }

  createQuestion(examId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.questionsUrl}/exam/${examId}`, formData);
  }

  updateQuestion(questionId: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.questionsUrl}/${questionId}`, formData);
  }

  deleteQuestion(questionId: string): Observable<any> {
    return this.http.delete(`${this.questionsUrl}/${questionId}`);
  }

  refreshQuestions(examId: string): void {
    this.getQuestionsByExamId(examId).subscribe({
      next: (questions) => this.questions.set(questions),
      error: (err) => console.error('Error refreshing questions:', err)
    });
  }
}