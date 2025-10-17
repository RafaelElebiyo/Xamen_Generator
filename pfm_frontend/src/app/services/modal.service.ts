// src/app/services/modal.service.ts
import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfessorLoginComponent } from '../professor/professor-login/professor-login.component';
import { EtudiantLoginComponent } from '../etudiant/etudiant-login/etudiant-login.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private modalService: NgbModal) {}

  openProfessorLoginModal(): void {
    this.modalService.open(ProfessorLoginComponent, { centered: true });
  }

  openEtudiantLoginModal(): void {
    this.modalService.open(EtudiantLoginComponent, { centered: true });
  }
}