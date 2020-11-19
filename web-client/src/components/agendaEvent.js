import React from 'react';
import '../App.css';

function AgendaEvent(props) {
    return (
        <div>
            <div className="Agenda-time">
                <h3>{props.time1} - {props.time2}</h3>
            </div>
            <div className="Agenda-content">
                <h2>{props.title}</h2>
                <span>{props.content}</span>
            </div>
        </div>
    )
}

export default AgendaEvent;