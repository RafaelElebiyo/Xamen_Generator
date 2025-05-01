// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ListComponent } from './exam/list/list.component';
import { PreviewComponent } from './exam/preview/preview.component';
import { ExamComponent } from './exam/exam.component';
import { ResultatComponent } from './exam/resultat/resultat.component'; 
import { ResultatEtudiantComponent } from './exam/resultat/resultat-etudiant/resultat-etudiant.component';
import { ListEtudiantComponent } from './etudiant/list-etudiant/list-etudiant.component';
import { QuestionComponent } from './exam/question/question.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: AccueilComponent, title: 'Accueil' },
    { path: 'etudiants', component: ListEtudiantComponent, title: 'Mes etudiants', canActivate: [AuthGuard] },
    { path: 'examens', component: ListComponent, title: 'Mes Examens', canActivate: [AuthGuard] },
    { path: 'preview/:id', component: PreviewComponent, title: 'Preview Exam', canActivate: [AuthGuard] },
    { path: 'resultats/exam/:id', component: ResultatComponent, title: 'Resultats', canActivate: [AuthGuard] },
    { path: 'exam/:id', component: ExamComponent, title: 'Exam', canActivate: [AuthGuard] },
    { 
      path: 'resultat/exam/:examId/etudiant/:etudiantId', 
      component: ResultatEtudiantComponent, 
      title: 'Mon Resultat', 
      canActivate: [AuthGuard] 
    },
    { 
      path: 'questions/exam/:examId', 
      component: QuestionComponent, 
      title: 'Modifier Questions', 
      canActivate: [AuthGuard] 
    }
];