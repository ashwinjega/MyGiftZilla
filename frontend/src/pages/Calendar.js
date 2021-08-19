import React, { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../css/Calendar.css";
import axios from "axios";
import { Container } from "react-bootstrap";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);

const MyCalendar = (props) => {
  const db = require("../components/db.js");
  //const [message, setMessage] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllItems();
  }, []);

  function getAllItems() {
    var ls = JSON.parse(localStorage.getItem("email"));
    var obj = {
      email: ls.email,
    };
    var js = JSON.stringify(obj);
    try {
      // Axios place events on calendar code follows
      var config = {
        method: "post",
        url: db.buildPath("api/findevent"),

        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config)
        .then(function (response) {
          const allItems = response.data.result;
          if (allItems.error) {
            // setMessage(allItems.error);
          } else {
            console.log(allItems);
            setEvents(allItems);
          }
        })
        .catch(function (error) {
          //setMessage(error);
        });
    } catch (e) {
      //setMessage(e.message);
    }
  }
  const handleSelect = ({ start, end }) => {
    const db = require("../components/db.js");
    var title = window.prompt("New Event name");
    var ls = JSON.parse(localStorage.getItem("email"));
    var obj = {
      email: ls.email,
      start: start,
      title: title,
      end: end,
    };

    //console.log(obj);
    var js = JSON.stringify(obj);
    try {
      // Axios post to database code follows
      var config = {
        method: "post",
        url: db.buildPath("api/addevent"),

        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config)
        .then(function (response) {
          var res = response.data;
          //console.log(res);
          if (res.error) {
            //setMessage(res.error);
          } else {
            if (res.error.length > 0) {
              //setMessage("API Error:" + res.error);
            } else {
              // setMessage("event has been added");
            }
          }
        })
        .catch(function (error) {
          //setMessage(error);
        });
    } catch (e) {
      //setMessage(e.message);
    }
    if (title) {
      // New Event Added
      setEvents((events) => [
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
      // console.log(events);
    }
  };
  
  function deleteEvent(title) {
    console.log(title);
    const db = require("../components/db.js");
    var ls = JSON.parse(localStorage.getItem("email"));
    var obj = {
      email: ls.email,
      title: title
    };

    //console.log(obj);
    var js = JSON.stringify(obj);
    try {
      // Axios post to database code follows
      var config = {
        method: "post",
        url: db.buildPath("api/removeevent"),

        headers: {
          "Content-Type": "application/json",
        },
        data: js,
      };

      axios(config)
        .then(function (response) {
          var res = response.data;
          if (res.error) {

          } else {
            if (res.error.length > 0) {
   
            } else {
  
            }
          }
        })
        .catch(function (error) {

        });
    } catch (e) {

    }
    document.location.reload()
  }
  return (
    <div>
      <Navigation />
      <h4 className="calendarHeader">
        Stay up to date with a personal Calendar!
      </h4>
      <div>
        <Container>
          <Calendar
            selectable
            localizer={localizer}
            events={events}
            popup
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            onSelectSlot={handleSelect}
            onSelectEvent={(event) => deleteEvent(event.title)}
          />
        </Container>
      </div>
    </div>
  );
};

export default MyCalendar;
