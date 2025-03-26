import React from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import CalendarIntegration from '../calendar/CalendarIntegration';
import useTaskManager from '../../../hooks/useTaskManager';
import './Task.css';

/**
 * Main Task component that combines TaskForm, TaskList, and CalendarIntegration
 */
const Task = ({ user }) => {
  const username = user?.username || 'anonymous';
  
  const {
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
  } = useTaskManager(user);

  return (
    <div className="task-container">
      <TaskForm
        editMode={editMode}
        taskName={taskName}
        taskDesp={taskDesp}
        taskDueDate={taskDueDate}
        taskPriority={taskPriority}
        handleInputChange={handleInputChange}
        handleCreateTask={handleCreateTask}
        handleUpdateTask={handleUpdateTask}
        handleDeleteTask={handleDeleteTask}
        handleCancelEdit={handleCancelEdit}
        setTaskName={setTaskName}
        setTaskDesp={setTaskDesp}
        setTaskDueDate={setTaskDueDate}
        setTaskPriority={setTaskPriority}
      />
      
      <div className="task-content-container">
        <CalendarIntegration task={selectedTask} />
        
        <TaskList
          username={username}
          allTasks={allTasks}
          selectedTask={selectedTask}
          handleClearAllTasks={handleClearAllTasks}
          handleEditTask={handleEditTask}
          handleToggleComplete={handleToggleComplete}
          handleSelectTaskForCalendar={handleSelectTaskForCalendar}
        />
      </div>
    </div>
  );
};

export default Task;