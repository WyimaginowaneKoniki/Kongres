import React from 'react';
import '../App.css';
import AgendaEvents from '../components/agendaEvent'

function Agenda(props) {
  const event = {
    time1: "10:00",
    time2: "12:00",
    title: "Opening",
    content: "Lorem ipsum"
  };

    return (
      <div>
          <h1>Agenda</h1>
            <AgendaEvents
              time1={event.time1}
              time2={event.time2}
              title={event.title}
              content={event.content}
            />
      </div>  
    );
}
export default Agenda;