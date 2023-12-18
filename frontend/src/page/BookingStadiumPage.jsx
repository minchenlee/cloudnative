import { useState, useEffect, useRef, useContext, createContext } from "react"
import FeatherIcon from 'feather-icons-react';
import FilterButton from "../components/buttons/FilterButton";
import BackButton from "../components/buttons/BackButton";
import StadiumCard from "../components/cards/StadiumCard";
import SiteStatusDirection from "../components/directions/SiteStatusDirection";
import TimeDirection from "../components/directions/TimeDirection";

import { dummyJson4StadiumData } from "../dummyJson/bookingDummy";
import JoinContext from "../contexts/JoinContext";
import WeekPicker from "../components/input/WeekPicker";
import { fetchData, postData } from "../utilities/api";

// for search bar
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import { styled } from '@mui/material/styles';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { set } from "react-hook-form";

const classifyWeekStatus = (weekStatus) => {
  const weekStatusArray = Object.values(weekStatus);
  return
}



function BookingStadiumPage(){
  const BookingDetailContext = createContext(null);
  const [stadiumData, setStadiumData] = useState(null);
  const [dayInterval, setDayInterval] = useState(0);
  const {selectedDayCode, setSelectedDayCode, selectedSport, setSelectedSport} = useContext(JoinContext);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  

  useEffect (() => {
    setSelectedDayCode(0);
    // 移除 localStorage 中的 bookingInfo，這樣讓使用者重新選擇場地
    window.localStorage.removeItem("Stadium-bookingInfo")
  }, [])

  // 利用 curretPage 去 call 相對應的 API
  const currentPage = window.location.href.split("/").pop();

  // 每當 selectedDate 改變，就會 call API
  const getStadiumData = async () => {
    const startYear = selectedDate.startOf('week').$y;
    const startMonth = selectedDate.startOf('week').$M + 1;
    const startDay = selectedDate.startOf('week').$D;
    const endYear = selectedDate.endOf('week').$y;
    const endMonth = selectedDate.endOf('week').$M + 1;
    const endDay = selectedDate.endOf('week').$D;
    let response = await postData(`bookings/sport/${selectedSport}`, {
      startDate: `${startYear}-${startMonth}-${startDay}`,
      endDate: `${endYear}-${endMonth}-${endDay}`
    })

    // generate date between start and end date
    const dateArray = [];
    const startDate = dayjs(`${startYear}-${startMonth}-${startDay}`);
    const endDate = dayjs(`${endYear}-${endMonth}-${endDay}`);
    const diff = endDate.diff(startDate, 'day');
    for (let i = 0; i <= diff; i++) {
      dateArray.push(startDate.add(i, 'day').format('YYYY-MM-DD'));
    }
    console.log(dateArray);
    
    response = Object.keys(response.data).map(key => {
      const weekStatus = {};
      const nonDateData = {};

      Object.entries(response.data[key]).forEach(([dataKey, value]) => {
        if (dataKey.match(/\d{4}-\d{2}-\d{2}/)) { // Check if the key is a date
          // Add this data to the weekStatus
          weekStatus[dataKey] = value;
        } else {
          // Add non-date data to nonDateData
          nonDateData[dataKey] = value;
        }
      });

      return {
        id: key,
        ...nonDateData,
        weekStatus: weekStatus
      };
    });

    // console.log(response);
    setStadiumData(response);
  }

  useEffect(() => {
    // console.log(selectedDate.startOf('week').$y)
    // console.log(selectedDate.startOf('week').$M + 1)
    // console.log(selectedDate.startOf('week').$D)
    getStadiumData();
  }, [selectedDate])

  // 用來控制 Carousel 的 scroll
  const CarouselRef = useRef(null);
  const scroll = (scrollOffset) => {
    CarouselRef.current.scrollLeft += scrollOffset;
  };

  // 用來控制 Carousel 的 button
  function CarouselButton(props){
    const offset = props.offset || "";
    const icon = props.icon || "";

    return(
      <button onClick={()=>scroll(offset)} className="text-dark-gray bg-none rounded-full hover:bg-dark-gray hover:text-white transition duration-300 flex justify-center p-2">
        <FeatherIcon icon={icon} width="38" height="38" strokeWidth="4"/>
      </button>
    )
  }

  return(
    <BookingDetailContext.Provider value={{dayInterval, setDayInterval}}>
      <div className="container mx-auto">
        <div className="relative px-16 w-full max-w-[1280px] mx-auto mt-16 mb-10 flex flex-col">
          <div className="flex flex-row justify-center items-center">
            <div className="absolute left-0">
              <BackButton linkMode={true} linkTo={'/booking'}/>
            </div>
            <div className="flex flex-row justify-center gap-3 h-14">
              <SearchBar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
              <FilterButton/>
            </div>
          </div>
          {/* using tailwind scrollbar package to control scrollbar*/}
          <div className="w-full mx-auto relative mt-12 px-8 py-2 flex flex-row justify-start overflow-x-auto gap-[34px] snap-x scrollbar scrollbar-none scroll-smooth" ref={CarouselRef}>
            { stadiumData && stadiumData.map((stadiumData, index) => {
              return(
                <StadiumCard stadiumData={stadiumData} key={index}/>
              )
            })}
            <div className="invisible mx-8">
              <StadiumCard stadiumData={""}/>
            </div>
          </div>
          <div className="mt-14">
            <SiteStatusDirection/>
          </div>
          <div className="absolute bottom-[128px] left-0">
            <TimeDirection/>
          </div>
          <div className="absolute bottom-72 right-0">
            <CarouselButton offset={190} icon="chevron-right"/>
          </div>
          <div className="absolute bottom-72 left-0">
            <CarouselButton offset={-190} icon="chevron-left"/>
          </div>
        </div>
      </div>
    </BookingDetailContext.Provider>
  )
}




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
  // const [value, setValue] = useState(dayjs());
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



export default BookingStadiumPage
