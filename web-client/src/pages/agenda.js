import React from 'react';
import '../App.css';
import AgendaEvents from '../components/AgendaEvent'
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

  const events1 = [
    {
      time1: "10:00",
      time2: "10:30",
      title: "Opening",
      content: "SimpleText is the native text editor for the Apple classic Mac OS.[1] SimpleText " +
      "allows text editing and text formatting (underline, italic, bold, etc.), fonts, and sizes. " +
      "It was developed to integrate the features included in the different versions of TeachText that were"
    }, 
    {
      time1: "11:00",
      time2: "12:00",
      title: "Keynote speakers",
      content: "SimpleText is the native text editor for the Apple classic Mac OS.[1] SimpleText " +
      "allows text editing and text formatting (underline, italic, bold, etc.), fonts, and sizes. " +
      "It was developed to integrate the features included in the different versions of TeachText that were"
    },
    {
      time1: "12:00",
      time2: "13:30",
      title: "Lecture",
      content: "SimpleText is the native text editor for the Apple classic Mac OS.[1] SimpleText " +
      "allows text editing and text formatting (underline, italic, bold, etc.), fonts, and sizes. " +
      "It was developed to integrate the features included in the different versions of TeachText that were"
    },
    {
      time1: "14:00",
      time2: "15:30",
      title: "Lecture",
      content: "SimpleText is the native text editor for the Apple classic Mac OS.[1] SimpleText " +
      "allows text editing and text formatting (underline, italic, bold, etc.), fonts, and sizes. " +
      "It was developed to integrate the features included in the different versions of TeachText that were"
    }
  ];

  const day1 = events1.map(event => 
    <AgendaEvents 
      time1 = {event.time1}
      time2 = {event.time2}
      title = {event.title}
      content = {event.content}
      />
  )

  const events2 = [
    {
      time1: "10:00",
      time2: "10:30",
      title: "Opening",
      content: "SimpleText is the native text editor for the Apple classic Mac OS.[1] SimpleText " +
      "allows text editing and text formatting (underline, italic, bold, etc.), fonts, and sizes. " +
      "It was developed to integrate the features included in the different versions of TeachText that were"
    }, 
    {
      time1: "11:00",
      time2: "12:00",
      title: "Keynote speakers",
      content: "SimpleText is the native text editor for the Apple classic Mac OS.[1] SimpleText " +
      "allows text editing and text formatting (underline, italic, bold, etc.), fonts, and sizes. " +
      "It was developed to integrate the features included in the different versions of TeachText that were"
    }
  ];

  const day2 = events2.map(event => 
    <AgendaEvents 
      time1 = {event.time1}
      time2 = {event.time2}
      title = {event.title}
      content = {event.content}
      />
  )

    return (
      <div>
          <h1>Agenda</h1>
            <div>
              <h1 className={style.date}>30.11.2020</h1>
              {day1}
            </div>
            <div>
              <h1 className={style.date}>1.12.2020</h1>
              {day2}
            </div>
      </div>  
    );
}
export default Agenda;