import {
  CALENDAR_API_INIT_REQUEST,
  CALENDAR_API_INIT_SUCCESS,
  CALENDAR_API_INIT_FAILURE,
  CALENDAR_SIGN_IN_REQUEST,
  CALENDAR_SIGN_IN_SUCCESS,
  CALENDAR_SIGN_IN_FAILURE,
  CALENDAR_SIGN_OUT,
  ADD_EVENT_REQUEST,
  ADD_EVENT_SUCCESS,
  ADD_EVENT_FAILURE
} from '../actionTypes';

import {
  initGoogleApi,
  isSignedIn,
  signIn,
  signOut,
  addEventToCalendar
} from '../../services/googleCalendar';

// Initialize Google Calendar API
export const initCalendarApi = () => async (dispatch) => {
  dispatch({ type: CALENDAR_API_INIT_REQUEST });
  
  try {
    await initGoogleApi();
    
    dispatch({
      type: CALENDAR_API_INIT_SUCCESS
    });
    
    // Check if already signed in
    if (isSignedIn()) {
      dispatch({
        type: CALENDAR_SIGN_IN_SUCCESS
      });
    }
    
    return true;
  } catch (error) {
    dispatch({
      type: CALENDAR_API_INIT_FAILURE,
      payload: error.message || 'Failed to initialize Google Calendar API'
    });
    
    throw error;
  }
};

// Sign in to Google Calendar
export const signInToCalendar = () => async (dispatch) => {
  dispatch({ type: CALENDAR_SIGN_IN_REQUEST });
  
  try {
    await signIn();
    
    dispatch({
      type: CALENDAR_SIGN_IN_SUCCESS
    });
    
    return true;
  } catch (error) {
    // Create a more detailed error object for the UI
    let errorMessage = 'Failed to sign in to Google Calendar';
    let showAuthHelp = false;
    
    if (error.error === 'popup_closed_by_user') {
      errorMessage = 'Sign-in was cancelled. Please try again.';
    } else if (error.error === 'access_denied') {
      errorMessage = 'You denied access to Google Calendar. Please allow access to continue.';
    } else if (error.error === 'redirect_uri_mismatch' ||
              (error.message && error.message.includes('redirect_uri_mismatch')) ||
              (error.details && error.details.includes('redirect_uri_mismatch'))) {
      errorMessage = 'Redirect URI mismatch error. See instructions below to fix this issue.';
      showAuthHelp = true;
    } else if (error.error === 'idpiframe_initialization_failed' ||
              (error.message && error.message.includes('idpiframe'))) {
      errorMessage = 'Google authentication initialization failed. This may be due to browser privacy settings or extensions.';
      showAuthHelp = true;
    }
    
    dispatch({
      type: CALENDAR_SIGN_IN_FAILURE,
      payload: {
        error: error.error || 'unknown_error',
        message: errorMessage,
        showAuthHelp
      }
    });
    
    throw error;
  }
};

// Sign out from Google Calendar
export const signOutFromCalendar = () => async (dispatch) => {
  try {
    await signOut();
    
    dispatch({
      type: CALENDAR_SIGN_OUT
    });
    
    return true;
  } catch (error) {
    // Even if there's an error, we'll still sign out on the client side
    dispatch({
      type: CALENDAR_SIGN_OUT
    });
    
    console.error('Error signing out from Google Calendar:', error);
    return false;
  }
};

// Add task to Google Calendar
export const addTaskToCalendar = (task) => async (dispatch, getState) => {
  dispatch({ type: ADD_EVENT_REQUEST });
  
  try {
    if (!task || !task.name) {
      throw new Error('Task must have a name to add to calendar');
    }
    
    const { calendar } = getState();
    
    // Check if we need to sign in first
    if (!calendar.signedIn) {
      try {
        await dispatch(signInToCalendar());
      } catch (error) {
        throw new Error('Please sign in to Google Calendar first');
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
    
    dispatch({
      type: ADD_EVENT_SUCCESS,
      payload: {
        event,
        response: response.result,
        eventLink: response.result?.htmlLink
      }
    });
    
    return response.result;
  } catch (error) {
    let errorMessage = 'Failed to add task to Google Calendar';
    
    if (error.message?.includes('not initialized')) {
      errorMessage = 'Google Calendar API not initialized. Please refresh and try again.';
    } else if (error.result?.error?.message) {
      errorMessage = `Failed to add task: ${error.result.error.message}`;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    dispatch({
      type: ADD_EVENT_FAILURE,
      payload: {
        error: error,
        message: errorMessage
      }
    });
    
    throw error;
  }
};