import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ExamService } from '../exam.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteExamComponent } from '../delete-exam/delete-exam.component';
import { FormComponent } from '../form/form.component';
import { PartagerComponent } from '../partager/partager.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  private examService = inject(ExamService);
  private router = inject(Router);
  private modalService = inject(NgbModal);

  exams = this.examService.exams;

  getQuestionTypes(questions: any[]): {QCM: number, DIRECT: number} {
    return {
      QCM: questions?.filter(q => q.type === 'QCM').length || 0,
      DIRECT: questions?.filter(q => q.type === 'DIRECT').length || 0
    };
  }

  getTotalDuration(questions: any[]): number {
    return questions?.reduce((sum, q) => sum + (q.tempsLimite || 0), 0) || 0;
  }

  shareLink(examLink: string): void {
    const modalRef = this.modalService.open(PartagerComponent, {
      centered: true,
      backdrop: 'static'
    });
    modalRef.componentInstance.link = examLink;
  }

  deleteExam(examId: string, examName: string): void {
    const modalRef = this.modalService.open(DeleteExamComponent);
    modalRef.componentInstance.examId = examId;
    modalRef.componentInstance.examName = examName;
    
    modalRef.result.then((result) => {
      if (result === 'deleted') {
        this.examService.refreshProfessorExams();
      }
    }).catch(() => {
    });
  }

  openEditModal(examId: string): void {
    this.router.navigate(['/questions/exam', examId]);
  }
openCreateModal(): void {
  const modalRef = this.modalService.open(FormComponent, {
    size: 'lg'
  });
  
  modalRef.result.then(() => {
    this.examService.refreshProfessorExams();
  });
}
  
  openExamPreview(examId: number) {
    this.router.navigate(['/preview', examId]); 
  }

  openResultModal(examId: number): void {
    this.router.navigate(['/resultats/exam', examId]); 
  }
}