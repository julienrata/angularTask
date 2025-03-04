import { Component, OnInit } from '@angular/core';
import { AppFormFieldComponent } from '../../shared/ui-components/app-form-field/app-form-field.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppButtonComponent } from '../../shared/ui-components';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    AppFormFieldComponent,
    AppButtonComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './task-create.component.html',
  styleUrl: './task-create.component.scss',
})
export class TaskCreateComponent implements OnInit {
  public createForm: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm = this.formBuilder.group({
      title: ['', Validators.minLength(5)],
    });
  }

  submit(): void {
    console.log(this.createForm.value);
  }
}
