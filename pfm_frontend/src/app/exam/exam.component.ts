import { Component, OnInit } from '@angular/core';
import { ExamService } from './exam.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReponseService } from './reponse/reponse.service';
import { ResultatService } from './resultat/resultat.service';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {
  exam: any = {
    nom: '',
    description: '',
    date: '',
    semestre: '',
    questions: []
  };
  
  currentQuestionIndex = 0;
  currentQuestion: any;
  examStarted = false;
  timeLeft: number = 0;
  timer: any;
  studentAnswers: any = {};
  examFinished = false;
  etudiantId: number | null = null;

  constructor(
    private examService: ExamService,
    private reponseService: ReponseService,
    private resultatService: ResultatService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCurrentEtudiant();
    const examId = this.route.snapshot.paramMap.get('id');
    if (examId) {
      this.loadExam(examId);
    }
  }

  private loadCurrentEtudiant(): void {
    try {
      const etudiantData = localStorage.getItem('currentEtudiant');
      if (etudiantData) {
        const etudiant = JSON.parse(etudiantData);
        this.etudiantId = etudiant?.id || null;
      }
    } catch (error) {
      console.error('Error parsing student data:', error);
      this.etudiantId = null;
    }
  }

  getImageName(fullUrl: string): string {
    return fullUrl.split('/').pop() || '';
  }

  loadExam(id: string): void {
    this.examService.getExamById(id).subscribe({
      next: (exam) => {
        this.exam = exam;
        exam.questions.forEach((q: any, index: number) => {
          this.studentAnswers[index] = '';
        });
      },
      error: (err) => {
        console.error('Error loading exam:', err);
      }
    });
  }

  calculateTotalDuration(): number {
    if (!this.exam || !this.exam.questions) return 0;
    return this.exam.questions.reduce((total: number, q: any) => total + q.tempsLimite, 0);
  }

  startExam(): void {
    if (!this.etudiantId) {
      console.error('No student ID available');
      return;
    }

    this.examStarted = true;
    this.currentQuestionIndex = 0;
    this.currentQuestion = this.exam.questions[this.currentQuestionIndex];
    this.startTimer(this.currentQuestion.tempsLimite); // Usar segundos directamente
  }

  startTimer(seconds: number): void {
    this.timeLeft = seconds;
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.nextQuestion();
      }
    }, 1000);
  }

  async nextQuestion(): Promise<void> {
    await this.saveCurrentAnswer();
    
    clearInterval(this.timer);
    
    if (this.currentQuestionIndex < this.exam.questions.length - 1) {
      this.currentQuestionIndex++;
      this.currentQuestion = this.exam.questions[this.currentQuestionIndex];
      this.startTimer(this.currentQuestion.tempsLimite); // Usar segundos directamente
    } else {
      this.finishExam();
    }
  }

  async saveCurrentAnswer(): Promise<void> {
    if (!this.etudiantId) return;

    const answer = this.studentAnswers[this.currentQuestionIndex];
    if (answer === undefined || answer === '') return;

    const isCorrect = answer === this.currentQuestion.reponseCorrecte;
    const score = isCorrect ? this.currentQuestion.score : 0;

    const reponseData = {
      etudiant: { id: this.etudiantId },
      question: { id: this.currentQuestion.id },
      reponse: answer,
      estCorrecte: isCorrect,
      score: score
    };

    try {
      await this.reponseService.createReponse(reponseData).toPromise();
      console.log('Response saved successfully');
    } catch (error) {
      console.error('Error saving response:', error);
    }
  }

  async finishExam(): Promise<void> {
    clearInterval(this.timer);
    this.examFinished = true;
    console.log('Student answers:', this.studentAnswers);
  }

  async submitExam(): Promise<void> {
    if (!this.etudiantId || !this.exam?.id) {
      console.error('Missing student ID or exam ID');
      return;
    }

    // Calculate total score
    const totalScore = this.exam.questions.reduce((total: number, q: any, index: number) => {
      const answer = this.studentAnswers[index];
      const isCorrect = answer === q.reponseCorrecte;
      return total + (isCorrect ? q.score : 0);
    }, 0);

    // Create result
    const resultatData = {
      etudiant: { id: this.etudiantId },
      exam: { id: this.exam.id },
      note: totalScore,
      dateSoumission: new Date().toISOString()
    };

    try {
      await this.resultatService.createResultat(resultatData).toPromise();
      console.log('Result created successfully');
      
      // Navigate to result page
      this.router.navigate([`/resultat/exam/${this.exam.id}/etudiant/${this.etudiantId}`]);
    } catch (error) {
      console.error('Error creating result:', error);
    }
  }

  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}