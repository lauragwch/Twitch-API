import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = () => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`side-menu ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <button className="toggle-button" onClick={toggleMenu}>
                {isExpanded ? '←' : '→'}
            </button>
            <ul>
                <li>
                    <Link to="/">
                        <div className="icon">🏠</div>
                        {isExpanded && <span>Home</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/games">
                        <div className="icon">🎮</div>
                        {isExpanded && <span>Games</span>}
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SideMenu;
