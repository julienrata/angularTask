import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskHistoryComponent } from './task-history/task-history.component';
import { ConfirmExitGuard } from '../guards/confirm-exit.guard';
import { TaskResolver } from '../resolvers/task.resolver';
import { TaskCreateComponent } from './task-create/task-create.component';

export const taskRoutes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: TaskListComponent },
  {
    path: 'details/:id',
    component: TaskDetailsComponent,
    resolve: { task: TaskResolver },
  },
  {
    path: 'edit/:id',
    component: TaskEditComponent,
    canDeactivate: [ConfirmExitGuard],
    resolve: { task: TaskResolver },
  },
  { path: 'create', component: TaskCreateComponent },
  {
    path: 'history',
    component: TaskHistoryComponent,
  },
];
