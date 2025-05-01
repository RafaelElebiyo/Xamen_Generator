import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormComponent } from '../exam/form/form.component';
import { FormquestionComponent } from '../exam/question/formquestion/formquestion.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  constructor(private modalService: NgbModal, private router: Router) {}
  openExamenForm() {
    this.modalService.open(FormComponent, {
      centered: true,
      size: 'xl',
      backdrop: 'static',
      keyboard: false
    });
  }

  // Para abrir el modal desde otro componente
openQuestionModal(examId: number) {
  const modalRef = this.modalService.open(FormquestionComponent);
  modalRef.componentInstance.examId = examId;
  modalRef.result.then((result) => {
    if (result === 'created') {
      // Actualizar lista de preguntas
    }
  });
}
  openExamenList(): void {
    this.router.navigate(['/examens']);
  }
  openResultatList() {
    this.router.navigate(['/resultats/exam/', 1]);
  }
}
