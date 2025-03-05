import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpBasicsComponent } from './components/http-basics/http-basics.component';
import { HttpAdvancedComponent } from './components/http-advanced/http-advanced.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'basics',
    pathMatch: 'full',
  },
  {
    path: 'basics',
    component: HttpBasicsComponent,
    title: 'HTTP Basics',
  },
  {
    path: 'advanced',
    component: HttpAdvancedComponent,
    title: 'Advanced HTTP',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HttpDemoRoutingModule {}
