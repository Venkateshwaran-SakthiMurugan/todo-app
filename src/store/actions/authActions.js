import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from '../actionTypes';

// Simulated API call for login
const loginApi = (credentials) => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      // Simple validation
      if (credentials.email && credentials.password) {
        // In a real app, this would be a server response
        resolve({
          id: 1,
          name: credentials.email.split('@')[0],
          email: credentials.email
        });
      } else {
        reject({ message: 'Invalid credentials' });
      }
    }, 1000);
  });
};

// Login action (async with Redux Thunk)
export const login = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  
  try {
    const user = await loginApi(credentials);
    
    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuthenticated', 'true');
    
    dispatch({
      type: LOGIN_SUCCESS,
      payload: user
    });
    
    return user; // Return for component use if needed
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.message || 'Login failed'
    });
    
    throw error; // Re-throw for component error handling
  }
};

// Logout action
export const logout = () => (dispatch) => {
  // Clear localStorage
  localStorage.removeItem('user');
  localStorage.setItem('isAuthenticated', 'false');
  
  dispatch({ type: LOGOUT });
};