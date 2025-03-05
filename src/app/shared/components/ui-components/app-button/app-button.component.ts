import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-button.component.html',
  styleUrls: ['./app-button.component.scss']
})
export class AppButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() iconLeft = '';
  @Input() iconRight = '';
  @Input() loading = false;
  @Output() clicked = new EventEmitter<MouseEvent>();

  get classes(): string {
    let btnClass = `btn btn-${this.variant} `;
    
    if (this.size === 'sm') btnClass += 'btn-sm ';
    if (this.size === 'lg') btnClass += 'btn-lg ';
    if (this.fullWidth) btnClass += 'w-100 ';
    if (this.loading) btnClass += 'disabled ';
    
    return btnClass;
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}