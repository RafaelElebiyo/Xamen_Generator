import { Component, inject, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuestionService } from './question.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormquestionComponent } from './formquestion/formquestion.component';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.css'
})
export class QuestionComponent {
  private modalService = inject(NgbModal);
  private questionService = inject(QuestionService);
  private router = inject(Router);

  examId = this.router.url.split('/').pop() || '';
  questions = this.questionService.questions;

  constructor() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getQuestionsByExamId(this.examId).subscribe({
      next: (questions) => this.questionService.questions.set(questions),
      error: (err) => console.error('Error loading questions:', err)
    });
  }

  openCreateModal() {
    const modalRef = this.modalService.open(FormquestionComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.examId = this.examId;
    
    modalRef.result.then(() => {
      this.loadQuestions();
    }).catch(() => {});
  }

  openEditModal(questionId: string) {
    const modalRef = this.modalService.open(FormquestionComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.examId = this.examId;
    modalRef.componentInstance.questionId = questionId;
    
    modalRef.result.then(() => {
      this.loadQuestions();
    }).catch(() => {});
  }

  deleteQuestion(questionId: string) {
    this.questionService.deleteQuestion(questionId).subscribe({
      next: () => {
        this.loadQuestions();
        console.log('Question supprimée avec succès');
      },
      error: (err) => {
        console.error("Erreur lors de la suppression de la question:", err);
      }
    });
  }
}