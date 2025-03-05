import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBadgeComponent } from '../app-badge/app-badge.component';

@Component({
  selector: 'app-task-status-badge',
  standalone: true,
  imports: [CommonModule, AppBadgeComponent],
  templateUrl: './task-status-badge.component.html',
  styleUrl: './task-status-badge.component.scss'
})
export class TaskStatusBadgeComponent {
  @Input() status: 'completed' | 'in-progress' | 'pending' = 'pending';

  get statusVariant(): 'success' | 'warning' | 'info' {
    switch(this.status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'warning';
      case 'pending':
      default:
        return 'info';
    }
  }

  get statusLabel(): string {
    switch(this.status) {
      case 'completed':
        return 'Terminé';
      case 'in-progress':
        return 'En cours';
      case 'pending':
      default:
        return 'En attente';
    }
  }
}