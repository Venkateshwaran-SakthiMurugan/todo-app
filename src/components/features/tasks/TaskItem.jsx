import React from 'react';
import './TaskItem.css';

/**
 * TaskItem component for displaying an individual task
 */
const TaskItem = ({ 
  task, 
  selectedTask, 
  handleEditTask, 
  handleToggleComplete, 
  handleSelectTaskForCalendar 
}) => {
  const isSelected = selectedTask && selectedTask.id === task.id;
  
  return (
    <div
      key={task.id}
      className={`task-item priority-${task.priority.toLowerCase()} ${task.completed ? 'completed' : ''} ${isSelected ? 'selected-for-calendar' : ''}`}
      onClick={() => handleEditTask(task)}
    >
      <div className="task-header">
        <h3>{task.name}</h3>
        <div 
          className="task-completion" 
          onClick={(e) => handleToggleComplete(task.id, task.completed, e)}
        >
          <input
            type="checkbox"
            checked={task.completed || false}
            readOnly
          />
          <span>{task.completed ? 'Completed' : 'Not Completed'}</span>
        </div>
      </div>
      
      <p>{task.description}</p>
      
      <div className="task-meta">
        <span className="task-priority">Priority: {task.priority}</span>
        
        {task.dueDate && (
          <span className="task-date task-due-date">
            Due: {new Date(task.dueDate).toLocaleString()}
          </span>
        )}
        
        <span className="task-date">
          Created: {new Date(task.createdAt).toLocaleString()}
        </span>
        
        {task.updatedAt && (
          <span className="task-date">
            Updated: {new Date(task.updatedAt).toLocaleString()}
          </span>
        )}
        
        <button
          className="calendar-select-btn"
          onClick={(e) => handleSelectTaskForCalendar(task, e)}
        >
          {isSelected ? '✓ Selected for Calendar' : 'Select for Calendar'}
        </button>
      </div>
    </div>
  );
};

export default TaskItem;