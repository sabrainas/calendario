import React from "react";
import './style.css';

const MiniCalendar = () => {
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  };

  const renderDate = (date: Date) => {
    const classNames = isWeekend(date) ? "closed-date" : "";
    return (
      <div key={date.toISOString()} className={`date-cell ${classNames}`}>
        {date.getDate()}
      </div>
    );
  };

  const currentDate = new Date();
  const datesToShow = [currentDate];

  for (let i = 1; i <= 6; i++) {
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + i);
    datesToShow.push(nextDate);
  }

  return (
    <div className="mini-calendar bg-gray-200 p-2 rounded-md mb-4">
      {datesToShow.map((date) => renderDate(date))}
    </div>
  );
};

export default MiniCalendar;