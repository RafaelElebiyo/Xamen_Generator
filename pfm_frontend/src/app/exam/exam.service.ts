import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamService {
  private baseUrl = 'http://localhost:8080/exams';
  private questionsUrl = 'http://localhost:8080/questions';
  exams = signal<any[]>([]);
  private currentProfessorId: number | null = null;

  constructor(private http: HttpClient) {
    this.loadCurrentProfessorId(); 
    this.loadProfessorExams();
  }

  private loadCurrentProfessorId(): void {
    const currentProfessor = localStorage.getItem('currentProfessor');
    if (currentProfessor) {
      const professor = JSON.parse(currentProfessor);
      this.currentProfessorId = professor.id;
    } else {
      console.error('No se encontró el profesor en el localStorage');
    }
  }

  createExam(examData: any): Observable<any> {
    if (!this.currentProfessorId) {
      throw new Error('ID del profesor no disponible');
    }
    return this.http.post(this.baseUrl, {
      ...examData,
      professor: { id: this.currentProfessorId }
    });
  }

  getExamById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  findByNom(nom: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/nom/${nom}`);
  }

  updateExam(examId: string, examData: any): Observable<any> {
    if (!this.currentProfessorId) {
      throw new Error('ID del profesor no disponible');
    }
    const dataToSend = {
      ...examData,
      professor: { id: this.currentProfessorId }
    };
    return this.http.put(`${this.baseUrl}/${examId}`, dataToSend);
  }

  deleteExam(examId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${examId}`);
  }

  getQuestionsByExamId(examId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.questionsUrl}/exam/${examId}`);
  }

  calculateTotalDuration(questions: any[]): number {
    return questions.reduce((total, q) => total + q.tempsLimite, 0) / 60;
  }

  private loadProfessorExams(): void {
    if (!this.currentProfessorId) {
      console.error('No se puede cargar los exámenes: ID del profesor no disponible');
      return;
    }
    this.http.get<any[]>(`${this.baseUrl}/professor/${this.currentProfessorId}`).subscribe({
      next: (data) => this.exams.set(data),
      error: (err) => console.error('Error loading exams:', err)
    });
  }

  refreshProfessorExams(): void {
    this.loadProfessorExams();
  }

  formatDate(date: string | Date): string {
    if (typeof date === 'string') {
      return date.split('T')[0];
    }
    return date.toISOString().split('T')[0];
  }
}