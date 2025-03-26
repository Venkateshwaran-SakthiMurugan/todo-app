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

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  currentTask: null
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    // Fetch tasks
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: action.payload,
        error: null
      };
    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    // Add task
    case ADD_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
        error: null
      };
    case ADD_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    // Update task
    case UPDATE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case UPDATE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.map(task => 
          task.id === action.payload.id ? action.payload : task
        ),
        error: null
      };
    case UPDATE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    // Delete task
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter(task => task.id !== action.payload),
        error: null
      };
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    default:
      return state;
  }
};

export default taskReducer;