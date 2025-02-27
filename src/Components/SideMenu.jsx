import React, { use, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css';
import FollowedStreamsService from '../Services/FollowedStreamsService';

const userId = '';

const SideMenu = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [followedStreams, setFollowedStreams] = useState([]);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };


    useEffect(() => {
        const fetchFollowedStreams = async () => {
            try {
                const response = await FollowedStreamsService.fetchFollowedStreams(userId);
                setFollowedStreams(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFollowedStreams();
    }
    , []);


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

                {followedStreams.length > 0 && (
                    <>
                        <h3 className="section-title">{isExpanded && "Followed Streams"}</h3>
                        {followedStreams.map((stream) => (
                            <li key={stream.id}>
                                <a
                                    href={`https://www.twitch.tv/${stream.user_login}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="followed-stream"
                                >
                                    <img
                                        src={stream.thumbnail_url.replace("{width}", "50").replace("{height}", "50")}
                                        alt={stream.user_name}
                                        className="stream-thumbnail"
                                    />
                                    {isExpanded && <span>{stream.user_name} - {stream.viewer_count} viewers</span>}
                                </a>
                            </li>
                        ))}
                    </>
                )}

            </ul>
        </div>
    );
}

export default SideMenu;
