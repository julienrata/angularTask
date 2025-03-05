import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';

@Component({
  selector: 'app-task-history',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './task-history.component.html',
  styleUrl: './task-history.component.scss',
})
export class TaskHistoryComponent implements OnInit {
  completedTasks$: Observable<Task[]>;
  activeTasks$: Observable<Task[]>;
  filteredTasks$: Observable<Task[]>;

  selectedFilter: 'all' | 'completed' | 'active' = 'all';
  searchTerm: string = '';

  constructor(private taskService: TaskService) {
    this.completedTasks$ = this.taskService.getFilteredTasks(true);
    this.activeTasks$ = this.taskService.getFilteredTasks(false);

    // Initialize filtered tasks with all tasks
    this.filteredTasks$ = this.taskService.tasks$;
  }

  ngOnInit(): void {
    // Set up filtered tasks based on filter selection and search term
    this.setupFilteredTasks();
  }

  private setupFilteredTasks(): void {
    // Get the base observable based on filter selection
    const tasks$ = this.getTasksByFilter().pipe(startWith([] as Task[]));

    // Combine with searchTerm changes
    this.filteredTasks$ = combineLatest([
      tasks$,
      // Using startWith to emit initial value
      this.taskService.tasks$.pipe(startWith([] as Task[])),
    ]).pipe(
      map(([tasks, _]) => {
        if (!this.searchTerm.trim()) {
          return tasks;
        }

        const searchTermLower = this.searchTerm.toLowerCase().trim();
        return tasks.filter((task) =>
          task.title.toLowerCase().includes(searchTermLower)
        );
      })
    );
  }

  private getTasksByFilter(): Observable<Task[]> {
    switch (this.selectedFilter) {
      case 'completed':
        return this.completedTasks$;
      case 'active':
        return this.activeTasks$;
      case 'all':
      default:
        return this.taskService.tasks$;
    }
  }

  applyFilter(): void {
    this.setupFilteredTasks();
  }

  onSearchChange(): void {
    this.applyFilter();
  }

  onFilterChange(): void {
    this.applyFilter();
  }

  clearFilters(): void {
    this.selectedFilter = 'all';
    this.searchTerm = '';
    this.applyFilter();
  }
}
