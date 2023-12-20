import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import FeatherIcon from 'feather-icons-react';

import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';



// search bar
dayjs.extend(isBetweenPlugin);
const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) => prop !== 'isSelected' && prop !== 'isHovered',
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: "#3F3F3F",
    color: "#FFFFFF",
    '&:hover, &:focus': {
      backgroundColor: "#3F3F3F",
    },
  }),
  ...(isHovered && {
    backgroundColor: "#CCCCCC",
    '&:hover, &:focus': {
      backgroundColor: "#CCCCCC",
    },
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: '30%',
    borderBottomLeftRadius: '30%',
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: '30%',
    borderBottomRightRadius: '30%',
  }),
}));

const isInSameWeek = (dayA, dayB) => {
  if (dayB == null) {
    return false;
  }

  return dayA.isSame(dayB, 'week');
};

function Day(props) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}

function SearchBar(props) {
  const [weekPickerOpen, setWeekPickerOpen] = useState(false)
  const [hoveredDay, setHoveredDay] = useState(null);
  const value = props.selectedDate;
  const setValue = props.setSelectedDate;
  
  // 可以存下 startofWeek 的 年 月 日
  // 可以存下 endofWeek 的 年 月 日
  // selectedWeek 存 [第一天的月, 第一天的日, 最後一天的月, 最後一天的日]
  // 以 2023 12 12
  // .$d => Tue Dec 12 2023 04:57:37 GMT+0800 (台北標準時間)
  // .$y 年 => 2023
  // .$M + 1 月 => 11+1
  // .$D 日 => 12

  useEffect(() => {
    console.log(weekPickerOpen)
  }, [weekPickerOpen])

  return (
    <div className="relative text-dark-gray font-semibold bg-white w-[378px] px-2 py-3 rounded-full border-solid border-silver border-2 shadow-md flex items-center">
      <div className="w-full h-full pe-8 divide-x-2">
        <button className="w-1/2 h-full text-base text-center">所有場地</button>
        <button className="w-1/2 h-full text-base text-start ps-3 font-robotoMono"
          onClick={() => setWeekPickerOpen(!weekPickerOpen)}> 
          {value.startOf('week').$M + 1}/{value.startOf('week').$D} - {value.endOf('week').$M +1}/{value.endOf('week').$D}
        </button>
      </div>
      <button className="absolute right-2 p-2 rounded-full bg-primary text-white flex justify-center items-center">
        <FeatherIcon icon="search" width="24" height="24" strokeWidth="4" />
      </button>
      <div className={`absolute z-40 top-20 ${weekPickerOpen ? null : 'invisible'}`}>
        <DateCalendar
          className='bg-white rounded-2xl border-1'
          value={value}
          onChange={(newValue) => {
            setValue(newValue)
          }}
          showDaysOutsideCurrentMonth
          disablePast
          slots={{ day: Day }}
          slotProps={{
            day: (ownerState) => ({
              selectedDay: value,
              hoveredDay,
              onPointerEnter: () => setHoveredDay(ownerState.day),
              onPointerLeave: () => setHoveredDay(null),
            }),
          }}
          sx={{
            width: 350, height: 330
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
