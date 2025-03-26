# Todo App with Redux Thunk

A modern React Todo application with Redux for state management and Redux Thunk for handling asynchronous actions.

## Features

- User authentication (simulated)
- Task management (create, read, update, delete)
- Google Calendar integration
- Redux state management
- Asynchronous actions with Redux Thunk

## Project Structure

The project follows a scalable and maintainable structure:

```
src/
├── assets/              # Static assets like images, icons, etc.
├── components/          # Reusable UI components
│   ├── common/          # Truly reusable components across the app
│   ├── features/        # Feature-specific components
│   │   ├── calendar/    # Calendar integration components
│   │   ├── tasks/       # Task-related components
│   │   └── auth/        # Authentication-related components
├── contexts/            # React context providers
├── hooks/               # Custom React hooks
├── layouts/             # Layout components (headers, footers, etc.)
├── pages/               # Page components
├── services/            # API and service integrations
├── store/               # Redux store configuration
│   ├── actions/         # Redux actions
│   ├── reducers/        # Redux reducers
│   └── index.js         # Store configuration
├── styles/              # Global styles and theme
├── utils/               # Utility functions
└── App.js               # Main App component
```

## Redux Implementation

This project uses Redux with Redux Thunk for state management:

- **Store**: Centralized state management
- **Actions**: Both synchronous and asynchronous actions
- **Reducers**: Pure functions that update state
- **Thunks**: For handling asynchronous operations like API calls

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## Google Calendar Integration

To use the Google Calendar integration:

1. Create a project in the [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Google Calendar API
3. Create OAuth 2.0 credentials
4. Add your domain to the authorized JavaScript origins
5. Update the `GOOGLE_API_CONFIG` in `src/services/googleCalendar.js` with your credentials

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Runs the test suite
- `npm eject`: Ejects from Create React App
- `npm run deploy`: Deploys the app to GitHub Pages

## Deploying to GitHub Pages

This app is configured for easy deployment to GitHub Pages. Follow these steps:

1. Create a GitHub repository for your project
2. Update the `homepage` field in `package.json` with your GitHub username:
   ```json
   "homepage": "https://your-username.github.io/todo-app"
   ```
3. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/todo-app.git
   git push -u origin main
   ```
4. Deploy the app to GitHub Pages:
   ```bash
   npm run deploy
   ```
5. Your app will be available at `https://your-username.github.io/todo-app`

## Best Practices Implemented

- **Separation of Concerns**: Components, services, and state management are separated
- **Custom Hooks**: Encapsulate complex logic in reusable hooks
- **Feature-Based Organization**: Components are organized by feature
- **Async State Management**: Using Redux Thunk for handling asynchronous operations
- **Consistent Naming**: Following consistent naming conventions
- **Error Handling**: Comprehensive error handling throughout the application

## Future Improvements

- Implement real backend API integration
- Add unit and integration tests
- Add more features like task categories and priorities
- Implement dark mode theme
- Add offline support with service workers