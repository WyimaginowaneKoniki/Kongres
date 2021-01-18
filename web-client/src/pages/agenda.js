import React from "react";
import "../App.css";
import AgendaEvents from "../components/AgendaEvent";
import { makeStyles } from "@material-ui/core/styles";

export default function Agenda() {
  const style = makeStyles({
    date: {
      display: "flex",
      justifyContent: "flexStart",
      color: '#54457F',
      marginBottom: '40px',
    },
  })();

  const events1 = [
    {
      time1: "10:00",
      time2: "11:00",
      title: "Opening",
      content: "Let's start our future!",
    },
    {
      time1: "11:00",
      time2: "12:30",
      title: "Keynote speaker - Dominik Tyc",
      content: "How to become a leader?",
    },
    {
      time1: "12:30",
      time2: "13:00",
      title: "Lunch break",
      content: "The most important part of the conference!",
    },
    {
      time1: "13:00",
      time2: "14:45",
      title: "Keynote speaker - Kamil Donda",
      content:"First mobile app from scratch",
    },
    {
      time1: "14:45",
      time2: "15:00",
      title: "Coffee break",
      content:"Warm, great coffee <3",
    },
    {
      time1: "15:00",
      time2: "16:30",
      title: "Keynote speaker - Jorge Patterson",
      content:"The Beauty of Mathematics",
    },
    {
      time1: "16:30",
      time2: "18:30",
      title: "Networking",
      content:"Talk with us!",
    },
  ];

  const day1 = events1.map((event) => (
    <AgendaEvents
      time1={event.time1}
      time2={event.time2}
      title={event.title}
      content={event.content}
    />
  ));

  const events2 = [
    {
      time1: "10:00",
      time2: "11:00",
      title: "Opening",
      content: "Let's start our future!",
    },
    {
      time1: "11:00",
      time2: "12:30",
      title: "Keynote speaker - Robert Kwoll",
      content: "What makes a good frontend developer?",
    },
    {
      time1: "12:30",
      time2: "13:00",
      title: "Lunch break",
      content: "The most important part of the conference!",
    },
    {
      time1: "13:00",
      time2: "14:45",
      title: "Keynote speaker - Sandra Uptas",
      content: "Future of UX Design",
    },
    {
      time1: "14:45",
      time2: "15:00",
      title: "Coffee break",
      content: "Warm, great coffee <3",
    },
    {
      time1: "15:00",
      time2: "16:30",
      title: "Keynote speaker - Katy Murray",
      content: "How to fight climate change at home?",
    },
    {
      time1: "16:30",
      time2: "18:30",
      title: "Networking",
      content: "Talk with us!",
    },
  ];

  const day2 = events2.map((event) => (
    <AgendaEvents
      time1={event.time1}
      time2={event.time2}
      title={event.title}
      content={event.content}
    />
  ));

  return (
    <div>
      <h1>Agenda</h1>
      <div>
        <h1 className={style.date}>15.06.2021</h1>
        {day1}
      </div>
      <div>
        <h1 className={style.date}>16.06.2021</h1>
        {day2}
      </div>
    </div>
  );
}
