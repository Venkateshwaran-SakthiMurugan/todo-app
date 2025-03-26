import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  ADD_TASK_FAILURE,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE
} from '../actionTypes';
import axios from 'axios';

// API base URL - replace with your actual API endpoint
const API_URL = 'https://api.example.com/tasks';

// Fetch tasks (async with Redux Thunk)
export const fetchTasks = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_TASKS_REQUEST });
  
  try {
    // In a real app, you would use axios to fetch from your API
    // const response = await axios.get(`${API_URL}?userId=${userId}`);
    
    // For now, we'll simulate a response
    const simulatedResponse = {
      data: [
        { id: 1, name: 'Complete project', description: 'Finish the React project', completed: false, dueDate: new Date().toISOString() },
        { id: 2, name: 'Learn Redux', description: 'Study Redux and Redux Thunk', completed: true, dueDate: new Date().toISOString() },
        { id: 3, name: 'Exercise', description: 'Go for a 30-minute run', completed: false, dueDate: new Date(Date.now() + 86400000).toISOString() }
      ]
    };
    
    dispatch({
      type: FETCH_TASKS_SUCCESS,
      payload: simulatedResponse.data
    });
    
    return simulatedResponse.data;
  } catch (error) {
    dispatch({
      type: FETCH_TASKS_FAILURE,
      payload: error.message || 'Failed to fetch tasks'
    });
    
    throw error;
  }
};

// Add a new task
export const addTask = (task) => async (dispatch) => {
  dispatch({ type: ADD_TASK_REQUEST });
  
  try {
    // In a real app, you would use axios to post to your API
    // const response = await axios.post(API_URL, task);
    
    // For now, we'll simulate a response
    const newTask = {
      ...task,
      id: Date.now(), // Generate a unique ID
      createdAt: new Date().toISOString()
    };
    
    dispatch({
      type: ADD_TASK_SUCCESS,
      payload: newTask
    });
    
    return newTask;
  } catch (error) {
    dispatch({
      type: ADD_TASK_FAILURE,
      payload: error.message || 'Failed to add task'
    });
    
    throw error;
  }
};

// Update an existing task
export const updateTask = (task) => async (dispatch) => {
  dispatch({ type: UPDATE_TASK_REQUEST });
  
  try {
    // In a real app, you would use axios to update your API
    // const response = await axios.put(`${API_URL}/${task.id}`, task);
    
    // For now, we'll simulate a response
    const updatedTask = {
      ...task,
      updatedAt: new Date().toISOString()
    };
    
    dispatch({
      type: UPDATE_TASK_SUCCESS,
      payload: updatedTask
    });
    
    return updatedTask;
  } catch (error) {
    dispatch({
      type: UPDATE_TASK_FAILURE,
      payload: error.message || 'Failed to update task'
    });
    
    throw error;
  }
};

// Delete a task
export const deleteTask = (taskId) => async (dispatch) => {
  dispatch({ type: DELETE_TASK_REQUEST });
  
  try {
    // In a real app, you would use axios to delete from your API
    // await axios.delete(`${API_URL}/${taskId}`);
    
    // For now, we'll simulate a successful deletion
    dispatch({
      type: DELETE_TASK_SUCCESS,
      payload: taskId
    });
    
    return taskId;
  } catch (error) {
    dispatch({
      type: DELETE_TASK_FAILURE,
      payload: error.message || 'Failed to delete task'
    });
    
    throw error;
  }
};