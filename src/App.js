import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './layouts/Header/Header';
import Login from './Pages/Login/Login';
import TaskPage from './Pages/TaskPage/TaskPage';
import { useAuth } from './contexts/AuthContext';
import './Styles/App.css';

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
        </Routes>
      </div>
    </div>
  );
}

export default App;