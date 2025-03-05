import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AppButtonComponent,
  AppCardComponent,
  AppBadgeComponent,
  AppFormFieldComponent,
  TaskStatusBadgeComponent,
} from '../../../shared/components/ui-components';

@Component({
  selector: 'app-styleguide',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AppButtonComponent,
    AppCardComponent,
    AppBadgeComponent,
    AppFormFieldComponent,
    TaskStatusBadgeComponent,
  ],
  templateUrl: './styleguide.component.html',
  styleUrls: ['./styleguide.component.scss'],
})
export class StyleguideComponent {
  name = '';
  description = '';
}
