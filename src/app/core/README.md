# Core Module

The Core module contains singleton services and features that are used exactly once throughout the application.

## Contents

- Authentication services
- HTTP interceptors
- Global error handlers
- App-level guards
- Other services that need to be singletons

## Usage Guidelines

1. Core features should be loaded only once in the application, typically in the AppModule or main app component
2. Services in core should usually use `providedIn: 'root'` to ensure they are singletons
3. Don't import the CoreModule in feature modules to avoid creating multiple instances of Core services

## Examples

- Auth service and guards
- HTTP interceptors like auth, caching, logging
- Application-wide error handling