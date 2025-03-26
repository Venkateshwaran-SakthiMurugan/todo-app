import React from 'react';
import './TaskForm.css';

// Input Field Component
const InputField = ({ id, value, placeholder, onChange }) => (
  <input
    id={id}
    className="input"
    value={value}
    placeholder={placeholder}
    onChange={onChange}
  />
);

// Priority Select Component
const PrioritySelect = ({ value, onChange }) => (
  <div className="priority-select-container">
    <label htmlFor="priority">Priority:</label>
    <select
      id="priority"
      className="input"
      value={value}
      onChange={onChange}
    >
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
  </div>
);


const TaskForm = ({
  editMode,
  taskName,
  taskDesp,
  taskDueDate,
  taskPriority,
  handleInputChange,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
  handleCancelEdit,
  setTaskName,
  setTaskDesp,
  setTaskDueDate,
  setTaskPriority
}) => {
  return (
    <div className='task-form'>
      <h2>{editMode ? 'Edit Task' : 'Create New Task'}</h2>
      <div className='task'>
        <InputField
          id="taskName"
          value={taskName}
          placeholder="Enter task name"
          onChange={handleInputChange(setTaskName)}
        />
        <InputField
          id="taskDescription"
          value={taskDesp}
          placeholder="Description"
          onChange={handleInputChange(setTaskDesp)}
        />
        <div className="form-group">
          <span>Due Date:</span>
          <input
            type="datetime-local"
            id="taskDueDate"
            className="input"
            value={taskDueDate}
            onChange={handleInputChange(setTaskDueDate)}
          />
        </div>
        <PrioritySelect 
          value={taskPriority} 
          onChange={handleInputChange(setTaskPriority)} 
        />
      </div>
      {editMode ? (
        <div className="button-group">
          <button className="button update-button" onClick={handleUpdateTask}>
            Update Task
          </button>
          <button className="button delete-button" onClick={handleDeleteTask}>
            Delete Task
          </button>
          <button className="button cancel-button" onClick={handleCancelEdit}>
            Cancel
          </button>
        </div>
      ) : (
        <button className="button" onClick={handleCreateTask}>
          Create Task
        </button>
      )}
    </div>
  );
};

export default TaskForm;