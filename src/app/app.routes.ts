import { Routes } from '@angular/router';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { StyleguideComponent } from './features/styleguide/components/styleguide.component';

// Import from feature barrels
import { AuthGuard } from './core';
import { PipesDemoComponent } from './features/pipes-demo';
import { FormsDemoComponent } from './features/forms-demo';
import { AnimationsDemoComponent } from './features/animations-demo/components/animations-demo.component';
import { BasicAnimationsComponent } from './features/animations-demo/components/basic-animations/basic-animations.component';
import { TransitionsComponent } from './features/animations-demo/components/transitions/transitions.component';
import { AdvancedAnimationsComponent } from './features/animations-demo/components/advanced-animations/advanced-animations.component';
import { KeyframesComponent } from './features/animations-demo/components/keyframes/keyframes.component';
import { StaggerComponent } from './features/animations-demo/components/stagger/stagger.component';

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
    path: 'animations-demo',
    component: AnimationsDemoComponent,
    title: 'Angular Animations Demo',
    children: [
      { path: 'basic', component: BasicAnimationsComponent },
      { path: 'transitions', component: TransitionsComponent },
      { path: 'advanced', component: AdvancedAnimationsComponent },
      { path: 'keyframes', component: KeyframesComponent },
      { path: 'stagger', component: StaggerComponent }
    ]
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