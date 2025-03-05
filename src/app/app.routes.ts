import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { StyleguideComponent } from './styleguide/styleguide.component';
import { FormsDemoComponent } from './forms-demo/forms-demo.component';
import { PipesDemoComponent } from './pipes-demo/pipes-demo.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/task.routes').then((m) => m.taskRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: 'forms-demo',
    component: FormsDemoComponent,
    title: 'Angular Forms Demo',
  },
  {
    path: 'http-demo',
    loadChildren: () => import('./http-demo/http-demo.module').then(m => m.HttpDemoModule),
    title: 'HTTP Demo',
  },
  {
    path: 'pipes-demo',
    component: PipesDemoComponent,
    title: 'Angular Pipes Demo',
  },
  {
    path: 'styleguide',
    component: StyleguideComponent,
    title: 'Styleguide',
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
