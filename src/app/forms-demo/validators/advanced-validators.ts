import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validator that ensures two fields match
 * Useful for password confirmation, email confirmation, etc.
 */
export function matchFieldsValidator(controlName: string, matchingControlName: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (!control || !matchingControl) {
      return null;
    }

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return null;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
      return { mustMatch: true };
    } else {
      matchingControl.setErrors(null);
      return null;
    }
  };
}

/**
 * Custom validator that checks if the control value is in a list of forbidden values
 */
export function forbiddenValuesValidator(forbiddenValues: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    const normalizedValue = control.value.toLowerCase();
    const isForbidden = forbiddenValues.some(
      forbidden => forbidden.toLowerCase() === normalizedValue
    );
    
    return isForbidden ? { forbiddenValue: { value: control.value } } : null;
  };
}

/**
 * Custom validator to enforce a minimum age (for date of birth fields)
 */
export function ageValidator(minAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    try {
      const birthDate = new Date(control.value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      // Adjust age if birth date hasn't occurred this year yet
      const hasHadBirthdayThisYear = 
        today.getMonth() > birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());
      
      const actualAge = hasHadBirthdayThisYear ? age : age - 1;
      
      return actualAge < minAge ? { minAge: { required: minAge, actual: actualAge } } : null;
    } catch (error) {
      return { invalidDate: true };
    }
  };
}

/**
 * Custom validator for complex password requirements
 */
export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    const value: string = control.value;
    const errors: ValidationErrors = {};
    let hasError = false;
    
    // Check for minimum length
    if (value.length < 8) {
      errors['minLength'] = { required: 8, actual: value.length };
      hasError = true;
    }
    
    // Check for uppercase letters
    if (!/[A-Z]/.test(value)) {
      errors['uppercase'] = true;
      hasError = true;
    }
    
    // Check for lowercase letters
    if (!/[a-z]/.test(value)) {
      errors['lowercase'] = true;
      hasError = true;
    }
    
    // Check for digits
    if (!/[0-9]/.test(value)) {
      errors['digit'] = true;
      hasError = true;
    }
    
    // Check for special characters
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      errors['specialChar'] = true;
      hasError = true;
    }
    
    return hasError ? { passwordStrength: errors } : null;
  };
}

/**
 * Custom validator for URL format
 */
export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    
    try {
      const url = new URL(control.value);
      return url.protocol === 'http:' || url.protocol === 'https:' ? null : { invalidUrl: true };
    } catch (error) {
      return { invalidUrl: true };
    }
  };
}