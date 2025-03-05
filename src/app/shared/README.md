# Shared Directory

The Shared directory contains reusable components, directives, and pipes that are used across multiple features.

## Organization

Shared resources:
- Should be reusable across multiple features
- Should not have dependencies on specific features
- Can be either standalone components or grouped in a SharedModule

## Contents

- UI components like buttons, cards, modals, etc.
- Directives like click-outside, scroll-tracking, etc.
- Pipes for common data transformations
- Models/interfaces used across features
- Common utility functions

## Usage Guidelines

1. Put items here only if they're used in multiple features
2. Keep components simple and focused on UI concerns
3. Avoid business logic in shared components
4. When using a SharedModule, import it only where needed to keep bundle sizes small

## Structure

```
/shared/
  /components/    # Reusable UI components 
  /directives/    # Custom directives
  /pipes/         # Custom pipes
  /models/        # Shared interfaces and classes
  /utils/         # Helper functions and utilities
  /styles/        # Global styles, mixins, variables
  index.ts        # Public API barrel file
```