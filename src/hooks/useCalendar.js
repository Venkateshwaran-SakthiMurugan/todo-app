import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  initCalendarApi,
  signInToCalendar,
  signOutFromCalendar,
  addTaskToCalendar
} from '../store/actions/calendarActions';

/**
 * Custom hook for Google Calendar integration with Redux
 * @returns {Object} - Calendar state and action methods
 */
const useCalendar = () => {
  const dispatch = useDispatch();
  const { 
    apiLoaded, 
    signedIn, 
    loading, 
    error, 
    message,
    lastAddedEvent
  } = useSelector(state => state.calendar);
  
  // Initialize Google Calendar API when the component mounts
  useEffect(() => {
    if (!apiLoaded && !loading) {
      dispatch(initCalendarApi()).catch(error => {
        console.error('Failed to initialize Google Calendar API:', error);
      });
    }
  }, [dispatch, apiLoaded, loading]);
  
  // Sign in to Google Calendar
  const handleSignIn = async () => {
    try {
      await dispatch(signInToCalendar());
      return true;
    } catch (error) {
      console.error('Error signing in to Google Calendar:', error);
      return false;
    }
  };
  
  // Sign out from Google Calendar
  const handleSignOut = async () => {
    try {
      await dispatch(signOutFromCalendar());
      return true;
    } catch (error) {
      console.error('Error signing out from Google Calendar:', error);
      return false;
    }
  };
  
  // Add a task to Google Calendar
  const addToCalendar = async (task) => {
    try {
      const result = await dispatch(addTaskToCalendar(task));
      return result;
    } catch (error) {
      console.error('Error adding task to Google Calendar:', error);
      throw error;
    }
  };
  
  return {
    apiLoaded,
    signedIn,
    loading,
    error,
    message,
    lastAddedEvent,
    handleSignIn,
    handleSignOut,
    addToCalendar
  };
};

export default useCalendar;