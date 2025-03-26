import React from 'react';
import { GOOGLE_API_CONFIG } from '../../../services/googleCalendar';

const GoogleAuthHelp = () => {
  const currentOrigin = window.location.origin;
  
  return (
    <div className="google-auth-help">
      <h4>Google Calendar Authentication Help</h4>
      
      <div className="help-section">
        <h5>Redirect URI Mismatch Error</h5>
        <p>
          This error occurs when the redirect URI used by your application doesn't match 
          any of the authorized redirect URIs in your Google Cloud Console project.
        </p>
        
        <h5>How to Fix:</h5>
        <ol>
          <li>
            Go to the <a 
              href="https://console.cloud.google.com/apis/credentials" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Google Cloud Console Credentials Page
            </a>
          </li>
          <li>Select your project</li>
          <li>
            Find the OAuth 2.0 Client ID with the following client ID: 
            <code>{GOOGLE_API_CONFIG.CLIENT_ID}</code>
          </li>
          <li>Click on "Edit" for this client ID</li>
          <li>
            Under "Authorized JavaScript origins", add:
            <code className="block-code">{currentOrigin}</code>
          </li>
          <li>
            Under "Authorized redirect URIs", add:
            <code className="block-code">{currentOrigin}</code>
            <code className="block-code">{`${currentOrigin}/`}</code>
          </li>
          <li>Click "Save"</li>
          <li>Wait a few minutes for the changes to propagate</li>
          <li>Refresh this page and try connecting to Google Calendar again</li>
        </ol>
      </div>
      
      <div className="help-section">
        <h5>Additional Troubleshooting:</h5>
        <ul>
          <li>Make sure you're using the correct Google account</li>
          <li>Clear your browser cache and cookies</li>
          <li>Try using an incognito/private browsing window</li>
          <li>
            If you're using a custom domain or localhost with a non-standard port, 
            make sure those are added to the authorized origins and redirect URIs
          </li>
        </ul>
      </div>
    </div>
  );
};

export default GoogleAuthHelp;