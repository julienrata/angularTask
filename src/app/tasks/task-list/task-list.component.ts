import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from '../../models/interfaces/task.interface';
import { TaskService } from '../../services/task.service';
import { 
  AppButtonComponent, 
  AppCardComponent, 
  TaskStatusBadgeComponent 
} from '../../shared/ui-components';
import { TitleCasePipe } from '../../shared/pipes/title-case.pipe';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgFor, 
    NgIf, 
    NgClass, 
    AsyncPipe, 
    RouterModule, 
    DatePipe,
    TitleCasePipe,
    AppButtonComponent,
    AppCardComponent,
    TaskStatusBadgeComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.tasks$;
  }

  ngOnInit(): void {
    // Nothing needed here since we're using the observable directly
  }

  completeTask(id: number): void {
    this.taskService.complete(id);
  }

  deleteTask(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      this.taskService.remove(id);
    }
  }
  
  getTaskStatus(task: Task): 'completed' | 'in-progress' | 'pending' {
    if (task.status) {
      return task.status;
    }
    return task.completed ? 'completed' : 'pending';
  }
  
  getPriorityClass(priority?: string): string {
    switch(priority) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-info';
      default: return '';
    }
  }
}
