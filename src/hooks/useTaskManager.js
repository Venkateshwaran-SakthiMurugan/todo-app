import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for managing tasks in localStorage
 * @param {Object} user - The current user object
 * @returns {Object} - Task state and management functions
 */
const useTaskManager = (user) => {
  const username = user?.username || 'anonymous';

  // Task form state
  const [taskId, setTaskId] = useState(() => parseInt(localStorage.getItem(`taskId_${username}`)) || 0);
  const [taskName, setTaskName] = useState('');
  const [taskDesp, setTaskDesp] = useState('');
  const [taskPriority, setTaskPriority] = useState('Medium');
  const [taskDueDate, setTaskDueDate] = useState('');
  
  // Task list state
  const [allTasks, setAllTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  // Load tasks from localStorage
  const loadTasksFromStorage = useCallback(() => {
    const tasks = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(`task_${username}_`)) {
        try {
          const task = JSON.parse(localStorage.getItem(key));
          tasks.push(task);
        } catch (e) {
          console.error('Error parsing task from localStorage:', e);
        }
      }
    }
    setAllTasks(tasks);
  }, [username]);

  // Load tasks when user changes
  useEffect(() => {
    if (user) {
      loadTasksFromStorage();
    }
  }, [user, loadTasksFromStorage]);

  // Reset form fields
  const resetForm = useCallback(() => {
    setTaskName('');
    setTaskDesp('');
    setTaskPriority('Medium');
    setTaskDueDate('');
    setEditMode(false);
    setEditTaskId(null);
  }, []);

  // Create a new task
  const handleCreateTask = useCallback(() => {
    if (!taskName.trim()) {
      alert('Task name cannot be empty!');
      return;
    }

    const newTask = {
      id: taskId,
      name: taskName,
      description: taskDesp,
      priority: taskPriority,
      dueDate: taskDueDate || null,
      completed: false,
      createdBy: username,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(`task_${username}_${taskId}`, JSON.stringify(newTask));
    localStorage.setItem(`taskId_${username}`, (taskId + 1).toString());

    setTaskId(prevId => prevId + 1);
    resetForm();
    loadTasksFromStorage();
  }, [taskName, taskDesp, taskPriority, taskDueDate, taskId, username, loadTasksFromStorage, resetForm]);

  // Clear all tasks
  const handleClearAllTasks = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(`task_${username}_`)) {
          keysToRemove.push(key);
        }
      }
  
      keysToRemove.forEach(key => localStorage.removeItem(key));
      loadTasksFromStorage();
      setSelectedTask(null);
    }
  }, [username, loadTasksFromStorage]);

  // Edit an existing task
  const handleEditTask = useCallback((task) => {
    setTaskName(task.name);
    setTaskDesp(task.description);
    setTaskPriority(task.priority);
    setTaskDueDate(task.dueDate || '');
    setEditMode(true);
    setEditTaskId(task.id);
    setSelectedTask(task);
  }, []);

  // Update an existing task
  const handleUpdateTask = useCallback(() => {
    if (!taskName.trim()) {
      alert('Task name cannot be empty!');
      return;
    }

    const taskKey = `task_${username}_${editTaskId}`;
    const existingTask = JSON.parse(localStorage.getItem(taskKey));

    if (!existingTask) {
      alert('Task not found!');
      return;
    }

    const updatedTask = {
      ...existingTask,
      name: taskName,
      description: taskDesp,
      priority: taskPriority,
      dueDate: taskDueDate || null,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(taskKey, JSON.stringify(updatedTask));
    
    // Update selectedTask if it was the edited task
    if (selectedTask && selectedTask.id === editTaskId) {
      setSelectedTask(updatedTask);
    }

    resetForm();
    loadTasksFromStorage();
  }, [taskName, taskDesp, taskPriority, taskDueDate, editTaskId, username, loadTasksFromStorage, resetForm, selectedTask]);

  // Delete a task
  const handleDeleteTask = useCallback((e) => {
    e.preventDefault(); // Prevent form submission
    
    if (!editTaskId) return;
    
    if (window.confirm('Are you sure you want to delete this task?')) {
      const taskKey = `task_${username}_${editTaskId}`;
      
      localStorage.removeItem(taskKey);
      
      // If the deleted task was selected for calendar, clear the selection
      if (selectedTask && selectedTask.id === editTaskId) {
        setSelectedTask(null);
      }
      
      resetForm();
      loadTasksFromStorage();
    }
  }, [editTaskId, username, selectedTask, loadTasksFromStorage, resetForm]);

  // Cancel editing
  const handleCancelEdit = useCallback(() => {
    resetForm();
  }, [resetForm]);

  // Toggle task completion status
  const handleToggleComplete = useCallback((taskId, currentStatus, e) => {
    if (e) {
      e.stopPropagation(); // Prevent triggering the parent onClick
    }
    
    const taskKey = `task_${username}_${taskId}`;
    const existingTask = JSON.parse(localStorage.getItem(taskKey));

    if (!existingTask) {
      alert('Task not found!');
      return;
    }

    const updatedTask = {
      ...existingTask,
      completed: !currentStatus
    };

    localStorage.setItem(taskKey, JSON.stringify(updatedTask));
    
    // Update selectedTask if it was the toggled task
    if (selectedTask && selectedTask.id === taskId) {
      setSelectedTask(updatedTask);
    }

    loadTasksFromStorage();
  }, [username, loadTasksFromStorage, selectedTask]);

  // Select a task for calendar without editing
  const handleSelectTaskForCalendar = useCallback((task, e) => {
    e.stopPropagation(); // Prevent triggering the edit mode
    setSelectedTask(task);
  }, []);

  // Generic input change handler
  const handleInputChange = (setter) => (event) => setter(event.target.value);

  return {
    // State
    taskName,
    taskDesp,
    taskPriority,
    taskDueDate,
    allTasks,
    editMode,
    selectedTask,
    
    // Setters
    setTaskName,
    setTaskDesp,
    setTaskPriority,
    setTaskDueDate,
    
    // Handlers
    handleInputChange,
    handleCreateTask,
    handleClearAllTasks,
    handleEditTask,
    handleUpdateTask,
    handleDeleteTask,
    handleCancelEdit,
    handleToggleComplete,
    handleSelectTaskForCalendar
  };
};

export default useTaskManager;