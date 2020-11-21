import React from 'react';
import '../App.css';
import {Link} from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul className = "nav-links">
            <Link to = '/'>
                <li>Home</li>
            </Link>
            <Link to = '/agenda'>
                <li>Agenda</li>
            </Link>
            <Link to = '/speakers'>
                <li>Keynote Speakers</li>
            </Link>
            <Link to = '/about'>
                <li>Info</li>
            </Link>
            <Link to = '/contact'>
                <li>Contact</li>
            </Link>
            <Link to = 'regulations'>
                <li>Regulations</li>
            </Link>
            </ul>
        </nav>
    );
}

export default Navigation;