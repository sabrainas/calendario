"use client";

import React, { useState } from "react";
import './style.css';
import Modal from "../Modal/Modal";

const MiniCalendar = ({ addEvent }:any) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = endOfMonth.getDate();
  const startDayOfWeek = startOfMonth.getDay();

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const renderDate = (date: number) => {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
    const classNames = isWeekend(dayDate) ? "closed-date" : "";
    return (
      <div key={date} className={`date-cell ${classNames}`} onClick={() => handleDateClick(dayDate)}>
        {date}
      </div>
    );
  };

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setAvailableSlots(["08:00 - 09:00", "09:00 - 10:00", "10:00 - 11:00"]); // Exemplo de horarios disponíveis
    setShowModal(true);
  };

  const handleConfirm = (slot: string) => {
    if (selectedDate) {
      addEvent({ date: selectedDate, slot });
    }
    setShowModal(false);
  };

  const days = [];
  for (let i = 0; i < startDayOfWeek; i++) {
    days.push(<div key={`empty-start-${i}`} className="date-cell empty-cell"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(renderDate(i));
  }

  const monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  const monthName = monthNames[currentDate.getMonth()];
  const year = currentDate.getFullYear();

  return (
    <div>
      <div className="mini-calendar bg-gray-200 p-2 rounded-md mb-4">
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => changeMonth(-1)} className="bg-gray-300 px-2 py-1 rounded">{"<"}</button>
          <div className="font-bold">{`${monthName} ${year}`}</div>
          <button onClick={() => changeMonth(1)} className="bg-gray-300 px-2 py-1 rounded">{">"}</button>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"].map((day) => (
            <div key={day} className="date-cell-header">{day}</div>
          ))}
          {days}
        </div>
      </div>
      {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          <div className="modal-content p-4 bg-white rounded">
            <h2 className="font-bold text-lg mb-2">Horários disponíveis para {selectedDate?.toLocaleDateString()}</h2>
            <ul className="mb-4">
              {availableSlots.map((slot) => (
                <li key={slot} onClick={() => handleConfirm(slot)} className="slot-item cursor-pointer p-2 hover:bg-gray-200 rounded">{slot}</li>
              ))}
            </ul>
            <button onClick={() => setShowModal(false)} className="bg-red-500 text-white px-4 py-2 rounded">Fechar</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MiniCalendar;