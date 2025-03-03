import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/interfaces/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-details',
  imports: [CommonModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
  standalone: true
})
export class TaskDetailsComponent implements OnInit {
  task: Task | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    // Get task from the resolver data
    this.task = this.route.snapshot.data['task'];
    
    if (!this.task) {
      this.router.navigate(['/not-found']);
    }
  }
  
  navigateToEdit(): void {
    if (this.task) {
      this.router.navigate(['/tasks/edit', this.task.id]);
    }
  }
  
  completeTask(): void {
    if (this.task && !this.task.completed) {
      this.taskService.complete(this.task.id);
      this.task = { ...this.task, completed: true };
    }
  }
  
  deleteTask(): void {
    if (this.task && confirm('Are you sure you want to delete this task?')) {
      this.taskService.remove(this.task.id);
      this.router.navigate(['/tasks/list']);
    }
  }
}
