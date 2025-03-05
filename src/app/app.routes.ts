import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { StyleguideComponent } from './features/styleguide/components/styleguide.component';

// Import from feature barrels
import { AuthGuard } from './core';
import { PipesDemoComponent } from './features/pipes-demo';
import { FormsDemoComponent } from './features/forms-demo';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  // Lazy loaded features
  {
    path: 'tasks',
    loadChildren: () => import('./features/tasks').then(m => m.taskRoutes),
    canActivate: [AuthGuard],
  },
  {
    path: 'http-demo',
    loadChildren: () => import('./features/http-demo').then(m => m.HttpDemoModule),
    title: 'HTTP Demo',
  },
  // Direct component routes
  {
    path: 'forms-demo',
    component: FormsDemoComponent,
    title: 'Angular Forms Demo',
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