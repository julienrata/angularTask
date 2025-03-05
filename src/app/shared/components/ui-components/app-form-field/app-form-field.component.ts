import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-form-field.component.html',
  styleUrls: ['./app-form-field.component.scss']
})
export class AppFormFieldComponent {
  @Input() label = '';
  @Input() required = false;
  @Input() hint = '';
  @Input() error = '';
  @Input() fullWidth = false;
}