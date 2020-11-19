import React from 'react';
import '../App.css';
import AgendaEvents from '../components/agendaEvent'

function Agenda(props) {
  const event = {
    time1: "10:00",
    time2: "12:00",
    title: "Opening",
    content: "Fusce justo nisi, malesuada sit amet dignissim eget, sollicitudin at augue. Fusce rutrum orci a bibendum sollicitudin. Fusce venenatis justo risus, a pulvinar nunc accumsan eget. Ut ante odio, porta sit amet consequat quis, dignissim ut purus. Praesent quis interdum neque. Proin tempor mauris eget purus varius auctor nec at ex. Vivamus ac augue vitae urna volutpat congue. Etiam a arcu quis lacus feugiat faucibus. Vestibulum quis massa condimentum, scelerisque nibh vitae, lacinia leo."
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