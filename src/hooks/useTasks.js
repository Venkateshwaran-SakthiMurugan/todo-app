import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchTasks, 
  addTask, 
  updateTask, 
  deleteTask 
} from '../store/actions/taskActions';

/**
 * Custom hook for managing tasks with Redux
 * @param {string} userId - The user ID to fetch tasks for
 * @returns {Object} - Tasks state and action methods
 */
const useTasks = (userId) => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector(state => state.tasks);
  
  // Fetch tasks when the component mounts or userId changes
  useEffect(() => {
    if (userId) {
      dispatch(fetchTasks(userId));
    }
  }, [dispatch, userId]);
  
  // Create a new task
  const createTask = async (taskData) => {
    try {
      return await dispatch(addTask({ ...taskData, userId }));
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  };
  
  // Update an existing task
  const editTask = async (taskData) => {
    try {
      return await dispatch(updateTask(taskData));
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  };
  
  // Delete a task
  const removeTask = async (taskId) => {
    try {
      return await dispatch(deleteTask(taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  };
  
  // Toggle task completion status
  const toggleTaskCompletion = async (task) => {
    try {
      return await dispatch(updateTask({
        ...task,
        completed: !task.completed
      }));
    } catch (error) {
      console.error('Error toggling task completion:', error);
      throw error;
    }
  };
  
  return {
    tasks,
    loading,
    error,
    createTask,
    editTask,
    removeTask,
    toggleTaskCompletion
  };
};

export default useTasks;