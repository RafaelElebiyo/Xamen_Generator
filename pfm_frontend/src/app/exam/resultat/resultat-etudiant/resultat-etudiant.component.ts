import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ResultatService } from '../resultat.service';
import { EtudiantService } from '../../../etudiant/etudiant.service';
import { ExamService } from '../../exam.service';
import { ReponseService } from '../../reponse/reponse.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-resultat-etudiant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultat-etudiant.component.html',
  styleUrls: ['./resultat-etudiant.component.css']
})
export class ResultatEtudiantComponent {
  private resultatService = inject(ResultatService);
  private etudiantService = inject(EtudiantService);
  private examService = inject(ExamService);
  private reponseService = inject(ReponseService);
  private route = inject(ActivatedRoute);

  reponses = signal<any[]>([]);
  resultat = signal<any>(null);
  etudiant = signal<any>(null);
  exam = signal<any>(null);
  questions = signal<any[]>([]);
  examId = '';
  etudiantId = '';

  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get('examId') || '';
    this.etudiantId = this.route.snapshot.paramMap.get('etudiantId') || '';

    this.loadData();
  }

  loadData() {
    // Cargar datos en paralelo
    forkJoin([
      this.resultatService.getResultatByExamAndEtudiant(
        Number(this.examId), 
        Number(this.etudiantId)
      ),
      this.etudiantService.getEtudiantById(Number(this.etudiantId)),
      this.examService.getExamById(this.examId),
      this.examService.getQuestionsByExamId(this.examId)
    ]).subscribe({
      next: ([resultat, etudiant, exam, questions]) => {
        this.resultat.set(resultat);
        this.etudiant.set(etudiant);
        this.exam.set(exam);
        this.questions.set(questions);
        
        // Cargar respuestas del estudiante para cada pregunta
        this.loadStudentResponses(questions);
      },
      error: (err) => console.error('Error loading data:', err)
    });
  }

  loadStudentResponses(questions: any[]) {
    const requests = questions.map(question => 
      this.reponseService.getReponseByQuestionAndEtudiant(
        Number(question.id), 
        Number(this.etudiantId)
    ));

    forkJoin(requests).subscribe({
      next: (responses) => {
        this.reponses.set(responses);
      },
      error: (err) => console.error('Error loading responses:', err)
    });
  }

  isCorrectAnswer(question: any, reponse: any): boolean {
    return reponse?.reponse === question.reponseCorrecte;
  }
}