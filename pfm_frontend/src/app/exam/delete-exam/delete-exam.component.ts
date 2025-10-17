import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExamService } from '../exam.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-exam',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-exam.component.html',
  styleUrls: ['./delete-exam.component.css']
})
export class DeleteExamComponent {
  @Input() examId!: string;
  @Input() examName!: string;

  constructor(
    public activeModal: NgbActiveModal,
    private examService: ExamService
  ) {}

  confirmDelete(): void {
    this.examService.deleteExam(this.examId).subscribe({
      next: () => {
        this.activeModal.close('deleted');
        this.examService.refreshProfessorExams();
      },
      error: (err) => {
        console.error('Error deleting exam:', err);
      }
    });
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}