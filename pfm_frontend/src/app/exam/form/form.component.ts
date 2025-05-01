import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamService } from '../exam.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormquestionComponent } from '../question/formquestion/formquestion.component';
import { Observable, forkJoin } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-exam-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html'
})
export class FormComponent {
  @Input() examId: string | null = null;
  exam: any = {
    nom: '',
    description: '',
    nombreQuestions: 1,
    date: new Date().toISOString().split('T')[0],
    semestre: 'S1'
  };
  isLoading = false;

  constructor(
    public activeModal: NgbActiveModal,
    private examService: ExamService,
    private modalService: NgbModal
  ) {
    if (this.examId) {
      this.loadExam();
    }
  }

  loadExam(): void {
    this.isLoading = true;
    this.examService.getExamById(this.examId!)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (data) => {
          this.exam = {
            nom: data.nom,
            description: data.description,
            nombreQuestions: data.nombreQuestions,
            date: data.date.split('T')[0],
            semestre: data.semestre
          };
        },
        error: (err) => console.error('Error loading exam:', err)
      });
  }

  submitForm(): void {
    this.isLoading = true;
    const examData = {
      ...this.exam,
      professor: { id: 1 }
    };

    const operation = this.examId
      ? this.examService.updateExam(this.examId, examData)
      : this.examService.createExam(examData);

    operation.pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (response) => {
        if (!this.examId) {
          // Para nuevos exámenes, buscamos por nombre para obtener el ID
          this.handleNewExamCreation();
        } else {
          this.examService.refreshProfessorExams();
          this.activeModal.close('success');
        }
      },
      error: (err) => console.error('Error saving exam:', err)
    });
  }

  private handleNewExamCreation(): void {
    this.examService.findByNom(this.exam.nom).subscribe({
      next: (exam) => {
        if (exam) {
          this.openQuestionModals(exam.id);
        }
        this.examService.refreshProfessorExams();
        this.activeModal.close('success');
      },
      error: (err) => {
        console.error('Error finding exam by name:', err);
        this.examService.refreshProfessorExams();
        this.activeModal.close('success');
      }
    });
  }

  private openQuestionModals(examId: string): void {
    // Abrimos los modales uno tras otro cuando se cierra el anterior
    this.openNextQuestionModal(examId, 0);
  }

  private openNextQuestionModal(examId: string, index: number): void {
    if (index >= this.exam.nombreQuestions) {
      return;
    }

    const modalRef = this.modalService.open(FormquestionComponent);
    modalRef.componentInstance.examId = +examId;
    
    modalRef.closed.subscribe({
      next: () => {
        this.openNextQuestionModal(examId, index + 1);
      },
      error: () => {
        this.openNextQuestionModal(examId, index + 1);
      }
    });
  }
}