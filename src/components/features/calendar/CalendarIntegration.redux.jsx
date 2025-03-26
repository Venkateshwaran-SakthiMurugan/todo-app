import React from 'react';
import { useSelector } from 'react-redux';
import { GOOGLE_API_CONFIG } from '../../../services/googleCalendar';
import GoogleAuthHelp from './GoogleAuthHelp';
import useCalendar from '../../../hooks/useCalendar';
import './CalendarIntegration.css';

const CalendarIntegration = ({ task }) => {
  const { 
    apiLoaded, 
    signedIn, 
    loading, 
    message, 
    error,
    lastAddedEvent,
    handleSignIn, 
    handleSignOut, 
    addToCalendar 
  } = useCalendar();
  
  // Determine if we should show auth help based on the error
  const showAuthHelp = error && error.showAuthHelp;

  // Handle adding task to calendar
  const addTaskToCalendar = async () => {
    if (!task) {
      console.error('No task selected to add to calendar');
      return;
    }

    if (!task.name) {
      console.error('Task must have a name to add to calendar');
      return;
    }

    try {
      await addToCalendar(task);
    } catch (error) {
      console.error('Error in component when adding to calendar:', error);
    }
  };

  if (!apiLoaded) {
    return <div className="calendar-loading">Loading Google Calendar API...</div>;
  }

  return (
    <div className="calendar-integration">
      <h3>Google Calendar Integration</h3>

      {message && <div className="calendar-message">
        {typeof message === 'string' ? message : (
          lastAddedEvent && lastAddedEvent.eventLink ? (
            <span>
              Task successfully added to Google Calendar!{' '}
              <a href={lastAddedEvent.eventLink} target="_blank" rel="noopener noreferrer">
                View in Calendar
              </a>
            </span>
          ) : message
        )}
      </div>}

      <div className="calendar-actions">
        {!signedIn ? (
          <button
            className="calendar-button sign-in-button"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? 'Connecting...' : 'Connect to Google Calendar'}
          </button>
        ) : (
          <>
            <button
              className="calendar-button add-button"
              onClick={addTaskToCalendar}
              disabled={loading || !task}
            >
              {loading ? 'Adding...' : 'Add Task to Calendar'}
            </button>
            <button
              className="calendar-button sign-out-button"
              onClick={handleSignOut}
              disabled={loading}
            >
              {loading ? 'Signing out...' : 'Disconnect Calendar'}
            </button>
          </>
        )}
      </div>

      {showAuthHelp && <GoogleAuthHelp />}

      <div className="calendar-info">
        <p>
          <small>
            Using Google Calendar API with Client ID: {GOOGLE_API_CONFIG.CLIENT_ID.substring(0, 12)}...
          </small>
        </p>
        <p>
          <small>
            Current origin: {window.location.origin}
          </small>
        </p>
      </div>
    </div>
  );
};

export default CalendarIntegration;