import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

/**
 * TaskList component for displaying a list of tasks
 */
const TaskList = ({
  username,
  allTasks,
  selectedTask,
  handleClearAllTasks,
  handleEditTask,
  handleToggleComplete,
  handleSelectTaskForCalendar
}) => {
  return (
    <div className="all-tasks">
      <div className="tasks-header">
        <h2>{username}'s Tasks ({allTasks.length})</h2>
        {allTasks.length > 0 && (
          <button className="clear-button" onClick={handleClearAllTasks}>
            Clear All
          </button>
        )}
      </div>

      {allTasks.length === 0 ? (
        <p>No tasks saved yet. Create a task to see it here.</p>
      ) : (
        <div className="tasks-list">
          {allTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              selectedTask={selectedTask}
              handleEditTask={handleEditTask}
              handleToggleComplete={handleToggleComplete}
              handleSelectTaskForCalendar={handleSelectTaskForCalendar}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;