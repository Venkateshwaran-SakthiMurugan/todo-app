// Google Calendar API configuration and service functions
export const GOOGLE_API_CONFIG = {
  // Replace these with your actual Google API credentials
  API_KEY: 'AIzaSyCE4ZgItubqtAAZzf1Dcw7bQZVCb8aW2w8',
  CLIENT_ID: '933675408175-tvoaq6d0b55mivhrus40cg65rn4i61ln.apps.googleusercontent.com',
  DISCOVERY_DOCS: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  SCOPES: 'https://www.googleapis.com/auth/calendar',
  // Add the redirect URI that matches what's configured in Google Cloud Console
  REDIRECT_URI: window.location.origin
};

// Initialize the Google API client using the newer approach
export const initGoogleApi = () => {
  return new Promise((resolve, reject) => {
    // First load the gsi client for authentication
    const gsiScript = document.createElement('script');
    gsiScript.src = 'https://accounts.google.com/gsi/client';
    gsiScript.async = true;
    gsiScript.defer = true;

    // Then load the API client
    gsiScript.onload = () => {
      const gapiScript = document.createElement('script');
      gapiScript.src = 'https://apis.google.com/js/api.js';
      gapiScript.async = true;
      gapiScript.defer = true;

      gapiScript.onload = () => {
        window.gapi.load('client', async () => {
          try {
            // Initialize the gapi.client with API key and discoveryDocs
            await window.gapi.client.init({
              apiKey: GOOGLE_API_CONFIG.API_KEY,
              discoveryDocs: GOOGLE_API_CONFIG.DISCOVERY_DOCS,
            });

            // Initialize Google Identity Services
            window.google.accounts.oauth2.initTokenClient({
              client_id: GOOGLE_API_CONFIG.CLIENT_ID,
              scope: GOOGLE_API_CONFIG.SCOPES,
              redirect_uri: GOOGLE_API_CONFIG.REDIRECT_URI,
              callback: () => {} // Will be overridden in signIn function
            });

            resolve(window.gapi);
          } catch (error) {
            reject(error);
          }
        });
      };

      gapiScript.onerror = (error) => reject(error);
      document.body.appendChild(gapiScript);
    };

    gsiScript.onerror = (error) => reject(error);
    document.body.appendChild(gsiScript);
  });
};

// Store access token
let accessToken = null;

// Check if user is signed in
export const isSignedIn = () => {
  return !!accessToken;
};

// Sign in to Google
export const signIn = async () => {
  if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
    throw new Error('Google Identity Services not initialized');
  }

  return new Promise((resolve, reject) => {
    try {
      const tokenClient = window.google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_API_CONFIG.CLIENT_ID,
        scope: GOOGLE_API_CONFIG.SCOPES,
        // Add the redirect URI
        redirect_uri: GOOGLE_API_CONFIG.REDIRECT_URI,
        callback: (tokenResponse) => {
          if (tokenResponse.error) {
            reject(tokenResponse);
            return;
          }

          accessToken = tokenResponse.access_token;
          window.gapi.client.setToken(tokenResponse);
          resolve(tokenResponse);
        },
      });

      // Prompt the user to select a Google Account and ask for consent
      tokenClient.requestAccessToken({
        prompt: 'consent',
        // Use a popup to avoid redirect issues
        login_hint: '',
        state: 'try_sample_request'
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Sign out from Google
export const signOut = async () => {
  if (!window.google || !window.google.accounts) {
    throw new Error('Google Identity Services not initialized');
  }

  // Clear the token
  if (window.gapi && window.gapi.client) {
    window.gapi.client.setToken(null);
  }

  // Reset the access token
  accessToken = null;

  // No need to explicitly revoke with the new approach
  return Promise.resolve();
};

// Add an event to Google Calendar
export const addEventToCalendar = async (event) => {
  if (!window.gapi || !window.gapi.client) {
    throw new Error('Google API client not initialized');
  }

  // Check if we have an access token
  if (!accessToken) {
    // If not signed in, sign in first
    await signIn();
  }

  // Make sure the calendar API is loaded
  if (!window.gapi.client.calendar) {
    await window.gapi.client.load('calendar', 'v3');
  }

  // Add the event to the calendar
  return window.gapi.client.calendar.events.insert({
    'calendarId': 'primary',
    'resource': event
  });
};