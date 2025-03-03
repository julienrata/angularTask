import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Task } from '../../models/interfaces/task.interface';
import { TaskService } from '../../services/task.service';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, AsyncPipe, RouterModule],
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
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.remove(id);
    }
  }
}
