import {useState, useContext, useEffect} from 'react';
import BookingDetailContext from '../../page/BookingStadiumPage';

import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';



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

export default function WeekPicker() {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [value, setValue] = useState(dayjs());
  const [selectedWeek, setSelectedWeek] = useState([]);


  const handleDateChange = (newValue) => {
    setValue(newValue);

    const startOfWeek = newValue.clone().startOf('week');
    const endOfWeek = newValue.clone().endOf('week');
    setSelectedWeek([startOfWeek.$d, endOfWeek]);
  };

  useEffect(() => {
    const startOfWeek = value.clone().startOf('week');
    const endOfWeek = value.clone().endOf('week');
    setSelectedWeek([startOfWeek.$d, endOfWeek.$d]);
  }, [value])

  useEffect(() => {
    console.log('setSelectedWeek?????', selectedWeek)
  }, [selectedWeek ])

  return (
    <DateCalendar
      className='bg-white rounded-2xl border-1'
      value={value}
      onChange={(newValue) => {
        handleDateChange(newValue)
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
  );
}
