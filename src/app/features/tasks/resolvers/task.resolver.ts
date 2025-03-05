import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, Observable, catchError, map, of } from 'rxjs';
import { Task } from '../models/task.interface';
import { TaskService } from '../services/task.service';

export const TaskResolver: ResolveFn<Task | null> = (route, state) => {
  const taskService = inject(TaskService);
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));
  
  if (isNaN(id) || id <= 0) {
    router.navigate(['/not-found']);
    return null;
  }

  return taskService.getTaskById(id).pipe(
    map(task => {
      if (!task) {
        router.navigate(['/not-found']);
        return null;
      }
      return task;
    }),
    catchError(() => {
      router.navigate(['/not-found']);
      return EMPTY;
    })
  );
};
