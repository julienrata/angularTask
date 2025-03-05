import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AdvancedFormComponent } from './advanced-form/advanced-form.component';

// Custom validator example
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
};

@Component({
  selector: 'app-forms-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AdvancedFormComponent],
  templateUrl: './forms-demo.component.html',
  styleUrl: './forms-demo.component.scss'
})
export class FormsDemoComponent implements OnInit {
  // Tab control
  activeTab: 'basic' | 'advanced' = 'basic';
  
  // Basic form controls
  basicControl = new FormControl('Initial value');
  
  // Form group example
  userForm!: FormGroup;
  
  // Nested form example
  profileForm!: FormGroup;
  
  // Form with array example
  skillsForm!: FormGroup;
  
  // Form with checkboxes, radio buttons and select
  preferencesForm!: FormGroup;
  
  // Countries for select dropdown
  countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'FR', name: 'France' },
    { code: 'DE', name: 'Germany' }
  ];
  
  // Interests for checkboxes
  interests = [
    { id: 1, name: 'Sports' },
    { id: 2, name: 'Music' },
    { id: 3, name: 'Movies' },
    { id: 4, name: 'Travel' },
    { id: 5, name: 'Cooking' }
  ];
  
  constructor(private fb: FormBuilder) {}
  
  ngOnInit(): void {
    // Initialize basic form group
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email])
    });
    
    // Initialize nested form with FormBuilder
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: this.fb.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: [''],
        zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]]
      })
    });
    
    // Initialize form with form array
    this.skillsForm = this.fb.group({
      name: ['', Validators.required],
      skills: this.fb.array([
        this.fb.control('', Validators.required)
      ])
    });
    
    // Initialize form with checkboxes, radio and select
    this.preferencesForm = this.fb.group({
      newsletter: [true],
      gender: ['female'],
      country: ['', Validators.required],
      interests: this.fb.array(this.interests.map(() => this.fb.control(false)))
    });
  }
  
  // Helper getter for skills FormArray
  get skills(): FormArray {
    return this.skillsForm.get('skills') as FormArray;
  }
  
  // Helper getter for interests FormArray
  get interestsArray(): FormArray {
    return this.preferencesForm.get('interests') as FormArray;
  }
  
  // Add skill to FormArray
  addSkill(): void {
    this.skills.push(this.fb.control('', Validators.required));
  }
  
  // Remove skill from FormArray
  removeSkill(index: number): void {
    this.skills.removeAt(index);
  }
  
  // Form submission handlers
  onUserFormSubmit(): void {
    if (this.userForm.valid) {
      console.log('User form submitted:', this.userForm.value);
      // Reset form after submission
      this.userForm.reset();
    } else {
      // Mark all fields as touched to trigger validation messages
      this.markFormGroupTouched(this.userForm);
    }
  }
  
  onProfileFormSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Profile form submitted:', this.profileForm.value);
      this.profileForm.reset();
    } else {
      this.markFormGroupTouched(this.profileForm);
    }
  }
  
  onSkillsFormSubmit(): void {
    if (this.skillsForm.valid) {
      console.log('Skills form submitted:', this.skillsForm.value);
      this.skillsForm.reset();
      // Reset skills array to have just one empty control
      this.skills.clear();
      this.skills.push(this.fb.control('', Validators.required));
    } else {
      this.markFormGroupTouched(this.skillsForm);
    }
  }
  
  onPreferencesFormSubmit(): void {
    if (this.preferencesForm.valid) {
      // Transform interests array of booleans to array of selected interest objects
      const selectedInterests = this.interests.filter((_, i) => this.interestsArray.at(i).value);
      
      const formData = {
        ...this.preferencesForm.value,
        interests: selectedInterests
      };
      
      console.log('Preferences form submitted:', formData);
      this.preferencesForm.reset({
        newsletter: false,
        gender: 'female',
        country: '',
        interests: this.interests.map(() => false)
      });
    } else {
      this.markFormGroupTouched(this.preferencesForm);
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
  
  // Reset form methods
  resetUserForm(): void {
    this.userForm.reset();
  }
  
  resetProfileForm(): void {
    this.profileForm.reset();
  }
  
  resetSkillsForm(): void {
    this.skillsForm.reset();
    this.skills.clear();
    this.skills.push(this.fb.control('', Validators.required));
  }
  
  resetPreferencesForm(): void {
    this.preferencesForm.reset({
      newsletter: false,
      gender: 'female',
      country: '',
      interests: this.interests.map(() => false)
    });
  }
  
  // Tab control method
  setActiveTab(tab: 'basic' | 'advanced'): void {
    this.activeTab = tab;
  }
}
