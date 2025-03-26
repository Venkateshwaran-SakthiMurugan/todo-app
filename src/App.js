import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Login from './Pages/Login/Login';
import TaskPage from './Pages/TaskPage/TaskPage';
import { useAuth } from './contexts/AuthContext';
import './Styles/App.css';

// Get the base URL for GitHub Pages deployment
const basename = process.env.PUBLIC_URL || '';

function App() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="Window">
      <Header
        user={user}
        onLogout={logout}
        isAuthenticated={isAuthenticated}
      />
      <div>
        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={isAuthenticated ? <TaskPage user={user} /> : <Navigate to="/login" />}
          />
          {/* Redirect to home for any unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;