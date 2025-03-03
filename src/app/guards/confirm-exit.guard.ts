import { CanDeactivateFn } from '@angular/router';

// Define interface for components that can be checked for unsaved changes
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Promise<boolean>;
}

export const ConfirmExitGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component, 
  currentRoute, 
  currentState, 
  nextState
) => {
  // If the component has a canDeactivate method, use it
  if (component.canDeactivate) {
    return component.canDeactivate();
  }
  
  // If the component has a formDirty property (common in form components)
  if ('formDirty' in component) {
    return component['formDirty'] 
      ? confirm('You have unsaved changes. Are you sure you want to leave?') 
      : true;
  }
  
  // Default to confirming navigation
  return confirm('Are you sure you want to leave this page?');
};
