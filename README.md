# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Project Features

### Modern Angular Patterns
- **Signals**: Using Angular signals for reactive state management
- **Computed Signals**: For derived state and filtering logic
- **Effects**: For side effects and reactive initialization
- **Dependency Injection**: Using `inject()` function instead of constructors
- **Standalone Components**: All components are standalone

### Google Books Integration
- **Smart Search**: Debounced search with 800ms delay and 3-character minimum
- **Auto-fill**: Automatic form population from Google Books data
- **Retry Logic**: Automatic retry with exponential backoff for API failures
- **Error Handling**: User-friendly error messages for different failure scenarios
- **Loading States**: Visual feedback during search operations
- **Manual Override**: All fields remain editable after Google Books import

### Form Validation
- **Native HTML5 Validation**: Using browser's built-in form validation
- **Visual Feedback**: Red borders for invalid fields
- **Required Fields**: Client-side validation for required inputs
- **User Experience**: Clear validation messages and feedback

### UI/UX Improvements
- **Responsive Cards**: Flexbox layout for consistent card sizing
- **Text Truncation**: Ellipsis for long titles, authors, and descriptions
- **Google Books Badge**: Visual indicator for imported books
- **Loading Indicators**: "Buscando..." during search operations
- **Error Messages**: Contextual error display for API failures
