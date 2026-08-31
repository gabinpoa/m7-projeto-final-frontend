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
- **Responsive Cards**: Grid layout for consistent card sizing
- **Text Truncation**: Ellipsis for long titles, authors, and descriptions
- **Google Books Badge**: Visual indicator for imported books
- **Loading Indicators**: "Buscando..." during search operations
- **Error Messages**: Contextual error display for API failures
