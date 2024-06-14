"use client";

import { useState } from 'react'
import { Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/pt-br';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"
import "react-big-calendar/lib/css/react-big-calendar.css"
import './styles.css';
import {eventoPadrao} from './eventos/Evento'
import EventModal from './eventos/EventoModal'
import Adicionar from './eventos/AdicionarEvento'
//import { MongoDatabase } from '../database/database'

const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment)

export default function Calendario() {
  //const mongo = new MongoDatabase()
  //mongo.calendar()
  const [events, setEvents] = useState(eventoPadrao)
  //const [selectEvent, setSelectEvent] = useState(null)

  const eventStyle = (event: any) => ({
    style: {
      backgroundColor: event.color
    },
  })

  const moveEvents = (data: any) => {
    const { start, end } = data;
    const updatedEvents = events.map((event) => {
      if (event.id === data.event.id) {
        return {
          ...event,
          start: new Date(start),
          end: new Date(end),
        };
      }
      return event;
    });
    setEvents(updatedEvents);
  }

  // const handleEventClick = (event: any) => {
  //   setSelectEvent(event)
  // }

  // const handleEventClose = (event: any) => {
  //   setSelectEvent(null)
  // }

  const handleAdd = (novoEvento: any) => {
    setEvents([...events, { ...novoEvento, id: events.length + 1 }]);
  }
  

  return (
    <div className='flex w-full '>
      {/* toolbar */}
      
      {/* calendario */}
      <div className='w-[80vw] h-screen'>
        <DragAndDropCalendar
          className='calendar'
          defaultDate={moment().toDate()}
          localizer={localizer}
          defaultView='month'
          events={events}
          resizable
          onEventDrop={moveEvents}
          onEventResize={moveEvents}
          //onSelectEvent={handleEventClick}
          eventPropGetter={eventStyle}
          components={{
            toolbar: CustomTollbar,
          }}
        />
      </div>

      {/* {selectEvent && (
        <EventModal
          event={selectEvent}
          onClose={handleEventClose}
        />
      )} */}
    </div>
  )
}

const CustomTollbar = ({ label, onView, onNavigate, views }: any) => {
  const [itemText, setItemText] = useState('Mês');
  const [open, setOpen] = useState(false);

  

  const toggleDropdown = () => {
    setOpen(!open);
  };

  const handleNavigate = (action: any) => {
    onNavigate(action);
  };

  return (
    <div className='m-3'>
      <div className="text-center">
        <h1 className="text-2xl text-white font-bold">{label}</h1>
      </div>

    
      <div className='relative flex justify-between'>
        <div>
          <button
            className="flex w-32 relative justify-between rounded border border-gray-600 focus:outline-none focus:border-white px-4 py-2 bg-zinc-400 font-semibold"
            onClick={toggleDropdown}
          >
            {itemText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-down"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {open && (
            <ul className='bg-white w-72 rounded absolute z-50 mt-2'>
              {views.map((view: any, index: any) => (
                <div key={index}>
                  <li className='font-semibold rounded uppercase hover:bg-gray-300'>
                    <button className="w-full  p-3 text-left" onClick={() => onView(view)}>
                      {view}
                    </button>
                  </li>
                </div>
              ))}
            </ul>
          )}
        </div>

        <div className='flex my-2 gap-2'>

          <button className="bg-zinc-400 px-4 py-2 rounded" onClick={() => handleNavigate('PREV')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
          </button>

          <button className="bg-zinc-400 px-4 py-2 font-semibold rounded" onClick={() => handleNavigate('TODAY')}>Hoje</button>

          <button className="bg-zinc-400 px-4 py-2 rounded" onClick={() => handleNavigate('NEXT')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
          </button>

        </div>
      </div>


    </div>
  );
};
