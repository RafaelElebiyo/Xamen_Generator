import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultatService } from './resultat.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resultat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultat.component.html',
  styleUrls: ['./resultat.component.css']
})
export class ResultatComponent {
  private resultatService = inject(ResultatService);
  private route = inject(ActivatedRoute);

  resultats = signal<any[]>([]);
  examId = '';

  ngOnInit() {
    this.examId = this.route.snapshot.paramMap.get('id') || '';
    this.loadResultats();
  }

  loadResultats() {
    this.resultatService.getResultatsByExam(Number(this.examId)).subscribe({
      next: (data) => this.resultats.set(data),
      error: (err) => console.error('Error loading results:', err)
    });
  }
}