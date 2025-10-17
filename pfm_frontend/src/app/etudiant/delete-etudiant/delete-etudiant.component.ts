import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-etudiant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-etudiant.component.html',
  styleUrls: ['./delete-etudiant.component.css']
})
export class DeleteEtudiantComponent {
  @Input() etudiantId!: number;
  @Input() etudiantName!: string;

  constructor(
    public activeModal: NgbActiveModal
  ) {}

  confirmDelete(): void {
    this.activeModal.close('deleted');
  }

  cancel(): void {
    this.activeModal.dismiss();
  }
}