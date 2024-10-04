import { useState } from "react";
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, isSameDay, isSameMonth, isToday, startOfMonth, startOfWeek } from 'date-fns';

export const DatePicker = ({ value, onChange }) => {
  const [isOpenDatePicker, setIsOpenDatePicker] = useState(false);

  function toggleDatePicker() {
    setIsOpenDatePicker(currentState => {
      return !currentState;
    })
  }

  return (
    <div className="date-picker-container">
      <button className="date-picker-button" onClick={toggleDatePicker}>{ value != null ? format(value, 'MMM do, yyyy') : 'Select a date' }</button>
      {isOpenDatePicker && <DatePickerModal selectedDate={ value } onChange={onChange} />}
    </div>
  )
}

const DatePickerModal = ({ selectedDate, onChange }) => {
  const [currentMonth, setCurrentMonth] = useState(selectedDate || new Date())

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth))
  })

  return (
    <div className="date-picker">
      <div className="date-picker-header">
        <button className="prev-month-button month-button" onClick={() => setCurrentMonth((d) => {
          return addMonths(currentMonth, -1)
        })}>&larr;</button>
        <div className="current-month">{ format(currentMonth, 'MMMM - yyyy') }</div>
        <button className="next-month-button month-button" onClick={() => setCurrentMonth((d) => {
          return addMonths(currentMonth, 1)
        })}>&rarr;</button>
      </div>
      <div className="date-picker-grid-header date-picker-grid">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
      <div className="date-picker-grid-dates date-picker-grid">
        { visibleDates.map((date) => {
          return <button
            className= {`date ${isSameDay(date, selectedDate) && "selected"}
            ${!isSameMonth(date, currentMonth) && "date-picker-other-month-date" }
            ${ isToday(date) && "today" }`}
            key={date.toDateString()}
            onClick={() => onChange(date)}
          >{date.getDate()}</button>
        })}
      </div>
    </div>
  )
}
