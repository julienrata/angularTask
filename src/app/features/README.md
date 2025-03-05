# Features Directory

This directory contains the main feature areas of the application, each in its own module or collection of standalone components.

## Organization

Each feature should be in its own directory and:
- Group related functionality
- Be organized by domain, not technical function
- Be able to be lazy loaded when possible
- Minimize dependencies on other features

## Structure Pattern

Each feature follows this pattern:

```
/feature-name/
  /components/        # UI components specific to this feature
  /services/          # Services specific to this feature
  /models/            # Interfaces and classes specific to this feature
  /guards/            # Route guards for this feature
  /directives/        # Feature-specific directives
  /pipes/             # Feature-specific pipes
  feature-routing.ts  # Routes for this feature (if applicable)
  index.ts            # Public API barrel file
```

## Feature Types

1. **Standalone Features**: Collections of standalone components without modules
2. **Module-based Features**: Traditional NgModules for more complex features
3. **Hybrid Features**: Mix of standalone components organized in a module

Choose the approach that best fits the complexity of each feature.