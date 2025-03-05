import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-card.component.html',
  styleUrl: './app-card.component.scss'
})
export class AppCardComponent {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() headerClass = '';
  @Input() bodyClass = '';
  @Input() footerClass = '';
  @Input() variant: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' = 'default';
  @Input() elevation: 'none' | 'sm' | 'md' | 'lg' = 'sm';
  @Input() hover = false;
  @Input() fullWidth = false;
}