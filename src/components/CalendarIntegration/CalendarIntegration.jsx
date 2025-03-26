import React, { useState, useEffect } from 'react';
import {
  initGoogleApi,
  isSignedIn,
  signIn,
  signOut,
  addEventToCalendar,
  GOOGLE_API_CONFIG
} from '../../utils/googleCalendarConfig';
import GoogleAuthHelp from './GoogleAuthHelp';
import './CalendarIntegration.css';

const CalendarIntegration = ({ task }) => {
  const [apiLoaded, setApiLoaded] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showAuthHelp, setShowAuthHelp] = useState(false);

  // Initialize Google API when component mounts
  useEffect(() => {
    let isMounted = true;

    const loadGoogleApi = async () => {
      try {
        setLoading(true);
        await initGoogleApi();

        if (isMounted) {
          setApiLoaded(true);
          setSignedIn(isSignedIn());
          setMessage('Google Calendar API loaded successfully');
        }
      } catch (error) {
        console.error('Error initializing Google API:', error);
        if (isMounted) {
          setMessage('Failed to load Google Calendar API. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadGoogleApi();

    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  // Handle Google sign in
  const handleSignIn = async () => {
    setLoading(true);
    setMessage('');

    try {
      await signIn();
      setSignedIn(true);
      setMessage('Successfully signed in to Google Calendar');
    } catch (error) {
      console.error('Error signing in:', error);

      // Provide more specific error messages
      if (error.error === 'popup_closed_by_user') {
        setMessage('Sign-in was cancelled. Please try again.');
        setShowAuthHelp(false);
      } else if (error.error === 'access_denied') {
        setMessage('You denied access to Google Calendar. Please allow access to continue.');
        setShowAuthHelp(false);
      } else if (error.error === 'redirect_uri_mismatch' ||
                (error.message && error.message.includes('redirect_uri_mismatch')) ||
                (error.details && error.details.includes('redirect_uri_mismatch'))) {
        setMessage('Redirect URI mismatch error. See instructions below to fix this issue.');
        setShowAuthHelp(true);
      } else if (error.error === 'idpiframe_initialization_failed' ||
                (error.message && error.message.includes('idpiframe'))) {
        setMessage('Google authentication initialization failed. This may be due to browser privacy settings or extensions.');
        setShowAuthHelp(true);
      } else {
        setMessage(`Failed to sign in to Google Calendar: ${error.message || error.error || 'Unknown error'}`);
        setShowAuthHelp(true);
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google sign out
  const handleSignOut = async () => {
    setLoading(true);
    setMessage('');

    try {
      await signOut();
      setSignedIn(false);
      setMessage('Successfully signed out from Google Calendar');
    } catch (error) {
      console.error('Error signing out:', error);
      setMessage(`Failed to sign out from Google Calendar: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Add task to Google Calendar
  const addTaskToCalendar = async () => {
    if (!task) {
      setMessage('No task selected to add to calendar');
      return;
    }

    if (!task.name) {
      setMessage('Task must have a name to add to calendar');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Check if we need to sign in first
      if (!signedIn) {
        await handleSignIn();
        if (!isSignedIn()) {
          setMessage('Please sign in to Google Calendar first');
          setLoading(false);
          return;
        }
      }

      // Calculate end time (30 minutes after start time)
      const startTime = task.dueDate ? new Date(task.dueDate) : new Date();
      const endTime = new Date(startTime.getTime() + 30 * 60000);

      // Create event object for Google Calendar
      const event = {
        summary: task.name,
        description: task.description || 'No description',
        start: {
          dateTime: startTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 30 }
          ]
        }
      };

      const response = await addEventToCalendar(event);
      console.log('Event created:', response);

      // Extract event link if available
      const eventLink = response.result?.htmlLink;
      if (eventLink) {
        setMessage(
          <span>
            Task successfully added to Google Calendar!{' '}
            <a href={eventLink} target="_blank" rel="noopener noreferrer">
              View in Calendar
            </a>
          </span>
        );
      } else {
        setMessage('Task successfully added to Google Calendar!');
      }
    } catch (error) {
      console.error('Error adding event to calendar:', error);

      // Provide more specific error messages
      if (error.message?.includes('not initialized')) {
        setMessage('Google Calendar API not initialized. Please refresh and try again.');
      } else if (error.result?.error?.message) {
        setMessage(`Failed to add task: ${error.result.error.message}`);
      } else {
        setMessage(`Failed to add task to Google Calendar: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!apiLoaded) {
    return <div className="calendar-loading">Loading Google Calendar API...</div>;
  }

  return (
    <div className="calendar-integration">
      <h3>Google Calendar Integration</h3>

      {message && <div className="calendar-message">{message}</div>}

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