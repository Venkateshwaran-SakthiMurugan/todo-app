import Task from '../../components/features/tasks/Task';
import './TaskPage.css';

export default function TaskPage({ user }) {
    return(
        <>
            <div className="task-page">
                {user && <div className="welcome-message">Welcome back, {user.username}!</div>}
                <Task user={user}/>
            </div>
        </>
    )
}