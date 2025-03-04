import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  AbstractControl, 
  FormBuilder, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import {
  ageValidator,
  forbiddenValuesValidator,
  matchFieldsValidator,
  passwordStrengthValidator,
  urlValidator
} from '../validators/advanced-validators';

@Component({
  selector: 'app-advanced-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './advanced-form.component.html',
  styleUrl: './advanced-form.component.scss'
})
export class AdvancedFormComponent implements OnInit {
  advancedForm!: FormGroup;
  registrationForm!: FormGroup;

  // List of forbidden usernames
  forbiddenUsernames = ['admin', 'root', 'superuser', 'administrator'];
  
  // Today's date for the datepicker max value
  today = new Date().toISOString().split('T')[0];
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    // Advanced validation examples
    this.advancedForm = this.fb.group({
      username: ['', [
        Validators.required,
        Validators.minLength(4),
        forbiddenValuesValidator(this.forbiddenUsernames)
      ]],
      website: ['', [
        Validators.required,
        urlValidator()
      ]],
      dateOfBirth: ['', [
        Validators.required,
        ageValidator(18)
      ]]
    });
    
    // Registration form with password validation
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        passwordStrengthValidator()
      ]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: matchFieldsValidator('password', 'confirmPassword')
    });
  }
  
  // Getter for easier access to form controls in the template
  get f(): { [key: string]: AbstractControl } {
    return this.advancedForm.controls;
  }
  
  get r(): { [key: string]: AbstractControl } {
    return this.registrationForm.controls;
  }
  
  onAdvancedFormSubmit(): void {
    if (this.advancedForm.valid) {
      console.log('Advanced form submitted:', this.advancedForm.value);
      this.advancedForm.reset();
    } else {
      this.markFormGroupTouched(this.advancedForm);
    }
  }
  
  onRegistrationFormSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Registration form submitted:', this.registrationForm.value);
      this.registrationForm.reset();
    } else {
      this.markFormGroupTouched(this.registrationForm);
    }
  }
  
  // Utility method to mark all controls in a form group as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  
  // Form reset methods
  resetAdvancedForm(): void {
    this.advancedForm.reset();
  }
  
  resetRegistrationForm(): void {
    this.registrationForm.reset();
  }
}
