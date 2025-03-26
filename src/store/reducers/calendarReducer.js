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

const initialState = {
  apiLoaded: false,
  signedIn: false,
  loading: false,
  error: null,
  message: '',
  lastAddedEvent: null
};

const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    // Calendar API initialization
    case CALENDAR_API_INIT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: 'Loading Google Calendar API...'
      };
    case CALENDAR_API_INIT_SUCCESS:
      return {
        ...state,
        loading: false,
        apiLoaded: true,
        error: null,
        message: 'Google Calendar API loaded successfully'
      };
    case CALENDAR_API_INIT_FAILURE:
      return {
        ...state,
        loading: false,
        apiLoaded: false,
        error: action.payload,
        message: 'Failed to load Google Calendar API. Please try again.'
      };
    
    // Calendar sign in
    case CALENDAR_SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: ''
      };
    case CALENDAR_SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        signedIn: true,
        error: null,
        message: 'Successfully signed in to Google Calendar'
      };
    case CALENDAR_SIGN_IN_FAILURE:
      return {
        ...state,
        loading: false,
        signedIn: false,
        error: action.payload,
        message: action.payload.message || 'Failed to sign in to Google Calendar'
      };
    
    // Calendar sign out
    case CALENDAR_SIGN_OUT:
      return {
        ...state,
        signedIn: false,
        message: 'Successfully signed out from Google Calendar'
      };
    
    // Add event to calendar
    case ADD_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: ''
      };
    case ADD_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        lastAddedEvent: action.payload,
        message: 'Task successfully added to Google Calendar!'
      };
    case ADD_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: action.payload.message || 'Failed to add task to Google Calendar'
      };
    
    default:
      return state;
  }
};

export default calendarReducer;