import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtudiantService } from '../etudiant.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormEtudiantComponent } from '../form-etudiant/form-etudiant.component';
import { DeleteEtudiantComponent } from '../delete-etudiant/delete-etudiant.component';

@Component({
  selector: 'app-list-etudiant',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.css']
})
export class ListEtudiantComponent {
  private etudiantService = inject(EtudiantService);
  private modalService = inject(NgbModal);

  etudiants = signal<any[]>([]);
  searchTerm = signal('');

  ngOnInit() {
    this.loadEtudiants();
  }

  loadEtudiants() {
    this.etudiantService.getAllEtudiants().subscribe({
      next: (data) => this.etudiants.set(data),
      error: (err) => console.error('Error loading students:', err)
    });
  }

  openEtudiantForm(etudiant?: any) {
    const modalRef = this.modalService.open(FormEtudiantComponent);
    modalRef.componentInstance.etudiant = etudiant ? {...etudiant} : { nom: '', email: '' };
    
    modalRef.result.then(
      (result) => {
        if (result) {
          if (result.id) {
            this.updateEtudiant(result);
          } else {
            this.createEtudiant(result);
          }
        }
      },
      () => {}
    );
  }

  createEtudiant(etudiant: any) {
    this.etudiantService.createEtudiant(etudiant).subscribe({
      next: (newEtudiant) => {
        this.etudiants.update(etds => [...etds, newEtudiant]);
      },
      error: (err) => console.error('Error creating student:', err)
    });
  }

  updateEtudiant(etudiant: any) {
    this.etudiantService.updateEtudiant(etudiant.id, etudiant).subscribe({
      next: (updatedEtudiant) => {
        this.etudiants.update(etds => 
          etds.map(e => e.id === updatedEtudiant.id ? updatedEtudiant : e)
        );
      },
      error: (err) => console.error('Error updating student:', err)
    });
  }

  deleteEtudiant(etudiantId: number, etudiantName: string) {
    const modalRef = this.modalService.open(DeleteEtudiantComponent);
    modalRef.componentInstance.etudiantId = etudiantId;
    modalRef.componentInstance.etudiantName = etudiantName;
    
    modalRef.result.then(
      (result) => {
        if (result === 'deleted') {
          this.etudiantService.deleteEtudiant(etudiantId).subscribe({
            next: () => {
              this.etudiants.update(etds => etds.filter(e => e.id !== etudiantId));
            },
            error: (err) => console.error('Error deleting student:', err)
          });
        }
      },
      () => {}
    );
  }
}