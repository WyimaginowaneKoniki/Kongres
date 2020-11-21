import React from 'react';
import '../App.css';
import AgendaEvents from '../components/agendaEvent'
import { makeStyles } from '@material-ui/core/styles';

function Agenda(props) {
  const styles = makeStyles({
    date: {
      textAlign: 'center',
      width: '20%',
      margin: '0',
    },
  });

  const style = styles();

  const event1 = {
    time1: "10:00",
    time2: "10:30",
    title: "Opening",
    content: "SimpleText is the native text editor for the Apple classic Mac OS.[1] SimpleText " +
    "allows text editing and text formatting (underline, italic, bold, etc.), fonts, and sizes. " +
    "It was developed to integrate the features included in the different versions of TeachText that were"
  };
  const event2 = {
    time1: "11:00",
    time2: "12:00",
    title: "Keynote speakers",
    content: "SimpleText is the native text editor for the Apple classic Mac OS.[1] SimpleText " +
    "allows text editing and text formatting (underline, italic, bold, etc.), fonts, and sizes. " +
    "It was developed to integrate the features included in the different versions of TeachText that were"
  };
  const event3 = {
    time1: "12:00",
    time2: "13:30",
    title: "Lecture",
    content: "SimpleText is the native text editor for the Apple classic Mac OS.[1] SimpleText " +
    "allows text editing and text formatting (underline, italic, bold, etc.), fonts, and sizes. " +
    "It was developed to integrate the features included in the different versions of TeachText that were"
  };
  const event4 = {
    time1: "14:00",
    time2: "15:30",
    title: "Lecture",
    content: "SimpleText is the native text editor for the Apple classic Mac OS.[1] SimpleText " +
    "allows text editing and text formatting (underline, italic, bold, etc.), fonts, and sizes. " +
    "It was developed to integrate the features included in the different versions of TeachText that were"
  };

    return (
      <div>
          <h1>Agenda</h1>
            <div>
              <h1 className={style.date}>30.11.2020</h1>
              <AgendaEvents
                time1={event1.time1}
                time2={event1.time2}
                title={event1.title}
                content={event1.content}
              />
              <AgendaEvents
                time1={event2.time1}
                time2={event2.time2}
                title={event2.title}
                content={event2.content}
              />
              <AgendaEvents
                time1={event3.time1}
                time2={event3.time2}
                title={event3.title}
                content={event3.content}
              />
              <AgendaEvents
                time1={event4.time1}
                time2={event4.time2}
                title={event4.title}
                content={event4.content}
              />
            </div>
            <div>
              <h1 className={style.date}>1.12.2020</h1>
              <AgendaEvents
                time1={event1.time1}
                time2={event1.time2}
                title={event1.title}
                content={event1.content}
              />
            </div>
      </div>  
    );
}
export default Agenda;