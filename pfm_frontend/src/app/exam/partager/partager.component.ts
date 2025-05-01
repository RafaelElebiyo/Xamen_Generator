import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-partager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './partager.component.html',
  styleUrls: ['./partager.component.css']
})
export class PartagerComponent {
  @Input() link: string = '';
  
  showCopiedMessage = false;

  constructor(public activeModal: NgbActiveModal) {}

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.link).then(() => {
      this.showCopiedMessage = true;
      setTimeout(() => this.showCopiedMessage = false, 2000);
    });
  }

  shareOnWhatsApp(): void {
    window.open(`https://wa.me/?text=${encodeURIComponent(this.link)}`, '_blank');
  }

  shareOnFacebook(): void {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.link)}`, '_blank');
  }

  shareOnTwitter(): void {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(this.link)}`, '_blank');
  }
}