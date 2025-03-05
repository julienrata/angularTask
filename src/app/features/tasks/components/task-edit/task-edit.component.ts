import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.interface';
import { TaskService } from '../../services/task.service';
import { CanComponentDeactivate } from '../../guards/confirm-exit.guard';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.scss',
})
export class TaskEditComponent implements OnInit, CanComponentDeactivate {
  task: Task | null = null;
  originalTask: string = ''; // Store original JSON for comparison
  formDirty = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    // Get task from resolver
    this.task = this.route.snapshot.data['task'];

    if (!this.task) {
      this.router.navigate(['/not-found']);
      return;
    }

    // Store original values for comparison
    this.originalTask = JSON.stringify(this.task);
  }

  onFormChange(): void {
    if (this.task) {
      this.formDirty = JSON.stringify(this.task) !== this.originalTask;
    }
  }

  saveTask(): void {
    if (this.task) {
      this.taskService.update(this.task).subscribe((updatedTask) => {
        this.formDirty = false;
        this.originalTask = JSON.stringify(updatedTask);
        this.router.navigate(['/tasks/details', updatedTask.id]);
      });
    }
  }

  cancelEdit(): void {
    if (this.task) {
      this.router.navigate(['/tasks/details', this.task.id]);
    }
  }

  // CanComponentDeactivate implementation
  canDeactivate(): boolean {
    if (!this.formDirty) {
      return true;
    }

    return confirm('You have unsaved changes. Are you sure you want to leave?');
  }
}
