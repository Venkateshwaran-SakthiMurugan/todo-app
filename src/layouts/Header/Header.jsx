import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Header.css';

const Header = ({ user, onLogout, isAuthenticated }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <nav className="header">
            <div className="header-left">
                <img 
                    className='logo' 
                    src="https://cdn1.iconfinder.com/data/icons/google_jfk_icons_by_carlosjj/512/tasks.png" 
                    alt="To-Do Manager"
                />
            </div>

            <h1 className="title">To-Do Manager</h1>

            <div className="header-right">
                {isAuthenticated && !isLoginPage ? (
                    <div>
                        <button className="logout" onClick={onLogout}>Logout</button>
                    </div>
                ) : !isAuthenticated && !isLoginPage ? (
                    <div>
                        <Link to="/login">
                            <button className="login">Login</button>
                        </Link>
                    </div>
                ) : null}
            </div>
        </nav>
    );
};

export default Header;