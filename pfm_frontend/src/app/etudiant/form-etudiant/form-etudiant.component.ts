import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-etudiant',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form-etudiant.component.html',
  styleUrls: ['./form-etudiant.component.css']
})
export class FormEtudiantComponent {
  @Input() etudiant: any = {
    nom: '',
    email: ''
  };

  constructor(public activeModal: NgbActiveModal) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.activeModal.close(this.etudiant);
    }
  }

  close(): void {
    this.activeModal.dismiss();
  }
}