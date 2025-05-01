// src/app/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ModalService } from '../services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private readonly studentRoutes = [
    '/exam/',
    '/resultat/exam/'
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const isStudentRoute = this.studentRoutes.some(route => state.url.startsWith(route));
    
    if (isStudentRoute) {
      if (this.authService.isEtudiantLoggedIn()) {
        return true;
      } else {
        this.modalService.openEtudiantLoginModal();
        return this.router.createUrlTree(['/']);
      }
    } else {
      // Todas las demás rutas son para profesores
      if (this.authService.isProfessorLoggedIn()) {
        return true;
      } else {
        this.modalService.openProfessorLoginModal();
        return this.router.createUrlTree(['/']);
      }
    }
  }
}