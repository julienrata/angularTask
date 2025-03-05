# Angular 19 Application Architecture

This application follows a modern, feature-based architecture pattern for Angular 19, using standalone components and a modular approach.

## Directory Structure

```
/app
  /core                 # Core functionality (singleton services, auth, etc.)
  /features             # Feature modules organized by domain
    /tasks              # Task management feature
    /http-demo          # HTTP examples and demos
    /forms-demo         # Forms examples and demos
    /pipes-demo         # Pipes examples and demos
    /styleguide         # UI style guide and component showcase
  /shared               # Shared components, directives, pipes
  app.component.*       # Root component
  app.config.ts         # App configuration
  app.routes.ts         # Main routing module
```

## Features Organization

Each feature follows a consistent organization pattern:

```
/feature-name
  /components           # UI components for this feature
  /services             # Services specific to this feature
  /models               # Data models and interfaces
  /guards               # Route guards (if applicable)
  /resolvers            # Route resolvers (if applicable)
  /pipes                # Feature-specific pipes
  /directives           # Feature-specific directives
  index.ts              # Public API barrel file
  feature.routes.ts     # Feature routing (if applicable)
```

## Core Module

The Core module contains singleton services and functionality that should be instantiated only once in the application:

- Authentication services
- Global HTTP interceptors
- Application-wide error handlers
- Core guards that apply to many routes

## Shared Module

The Shared module contains reusable components and utilities that are used across multiple features:

- UI components (buttons, cards, badges, etc.)
- Common directives
- Common pipes
- Shared styles and utilities

## Routing Strategy

The application uses a hierarchical routing approach:

1. Main routes in `app.routes.ts`
2. Feature routes in feature-specific routing files
3. Lazy loading for larger features to improve performance

## Best Practices

1. **Standalone Components by Default**
   - Use standalone components for most UI elements
   - Import only what components need

2. **Feature Encapsulation**
   - Keep features self-contained with minimal cross-feature dependencies
   - Use feature barrel files (index.ts) to expose public API

3. **Core for Singletons**
   - Keep singleton services in Core with `providedIn: 'root'`
   - Avoid importing Core in feature modules

4. **Shared for Reusables**
   - Only put components in Shared if they're used in multiple features
   - Keep shared components focused on UI concerns, not business logic

5. **Lazy Loading**
   - Lazy load features when possible to improve initial load time
   - Use preloading strategies for better user experience

## Angular 19 Features Used

- Standalone components
- Dependency injection with `providedIn: 'root'`
- Signals for reactive state (where applicable)
- Functional route guards and resolvers
- Strong typing throughout the application