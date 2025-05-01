import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamService } from '../exam.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-exam-preview',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {
  exam: any = {
    nom: '',
    description: '',
    date: '',
    semestre: '',
    lienExamen: '',
    professor: {
      id: 0,
      nom: ''
    },
    questions: []
  };

  constructor(
    private route: ActivatedRoute,
    private examService: ExamService
  ) { }

  ngOnInit(): void {
    const examId = this.route.snapshot.paramMap.get('id');
    if (examId) {
      this.loadExam(examId);
    }
  }

getImageName(fullUrl: string): string {
    return fullUrl.split('/').pop() || '';
  }

  loadExam(id: string): void {
    this.examService.getExamById(id).subscribe({
      next: (exam) => {
        this.exam = exam;
        this.exam.questions.forEach((q: any) => {
          if (q.type === 'QCM' && (!q.options || q.options.length === 0)) {
            q.options = [];
          }
        });
      },
      error: (err) => {
        console.error('Error loading exam:', err);
      }
    });
  }
}