import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormquestionService } from './formquestion.service';
import { QuestionType } from '../question-type.enum';  
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-question',
  templateUrl: './formquestion.component.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./formquestion.component.css']
})
export class FormquestionComponent {
  @Input() examId!: number;
  
  questionData = {
    texte: '',
    type: QuestionType.QCM,
    tempsLimite: 30,
    reponseCorrecte: '',
    score: 10,
    options: [] as string[],
    image: null as File | null
  };
  
  tempOption = '';
  questionTypes = Object.values(QuestionType);
  isLoading = false;
  errorMessage = '';

  constructor(
    public activeModal: NgbActiveModal,
    private formquestionService: FormquestionService
  ) {}

  addOption(): void {
    if (this.tempOption && !this.questionData.options.includes(this.tempOption)) {
      this.questionData.options.push(this.tempOption);
      this.tempOption = '';
    }
  }

  removeOption(option: string): void {
    this.questionData.options = this.questionData.options.filter(o => o !== option);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.questionData.image = file;
    }
  }

  submitQuestion(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    const formData = new FormData();
    formData.append('texte', this.questionData.texte);
    formData.append('type', this.questionData.type);
    formData.append('tempsLimite', this.questionData.tempsLimite.toString());
    formData.append('reponseCorrecte', this.questionData.reponseCorrecte);
    formData.append('score', this.questionData.score.toString());
    
    // Modificación para enviar options como string unido por _
    if (this.questionData.options.length > 0) {
        formData.append('options', this.questionData.options.join('_'));
    }
    
    if (this.questionData.image) {
        formData.append('image', this.questionData.image);
    }

    this.formquestionService.createQuestion(this.examId, formData).subscribe({
        next: () => {
            this.activeModal.close('success');
        },
        error: (err) => {
            this.errorMessage = 'Error creating question: ' + (err.error?.message || err.message);
            this.isLoading = false;
        }
    });
}

  close(): void {
    this.activeModal.dismiss();
  }
}