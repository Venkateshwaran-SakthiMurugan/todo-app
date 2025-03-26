import React from 'react';
import { useSelector } from 'react-redux';
import TaskList from '../../components/features/tasks/TaskList';
import './TaskPage.css';

const TaskPage = () => {
  // Get user from Redux store
  const { user } = useSelector(state => state.auth);
  
  return (
    <div className="task-page">
      <div className="task-page-header">
        <h1>Welcome, {user ? user.name : 'User'}!</h1>
        <p>Manage your tasks and stay organized</p>
      </div>
      
      <TaskList userId={user ? user.id : null} />
    </div>
  );
};

export default TaskPage;