import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';
import { TaskEditComponent } from './components/task-edit/task-edit.component';
import { TaskHistoryComponent } from './components/task-history/task-history.component';
import { TaskCreateComponent } from './components/task-create/task-create.component';
import { ConfirmExitGuard } from './guards/confirm-exit.guard';
import { TaskResolver } from './resolvers/task.resolver';

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
