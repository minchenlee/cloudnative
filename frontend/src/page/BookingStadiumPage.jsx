import { useState, useEffect, useRef, useContext, createContext } from "react"
import FeatherIcon from 'feather-icons-react';
import SearchBar from "../components/input/SearchBar";
import FilterButton from "../components/buttons/FilterButton";
import BackButton from "../components/buttons/BackButton";
import StadiumCard from "../components/cards/StadiumCard";
import SiteStatusDirection from "../components/directions/SiteStatusDirection";
import TimeDirection from "../components/directions/TimeDirection";
import { dayCodeToChineseDay } from "../utilities/DayCodeConverter"
import { dummyJson4StadiumData } from "../dummyJson/bookingDummy";
import AllContext from "../contexts/AllContext";
import WeekPicker from "../components/input/WeekPicker";
import { fetchData, postData } from "../utilities/api";

import 'ldrs/mirage'
// for search bar
import dayjs from 'dayjs';

function BookingStadiumPage(){
  const BookingDetailContext = createContext(null);
  const [stadiumData, setStadiumData] = useState(null);
  const [dayInterval, setDayInterval] = useState(0);
  const {selectedDayCode, setSelectedDayCode, selectedSport, setSelectedSport} = useContext(AllContext);
  const {dateCodeTable, setDateCodeTable} = useContext(AllContext); // 用來儲存日期和日期代碼的對應表
  const [selectedDate, setSelectedDate] = useState(dayjs()); // SearchBar, MUI Date Picker 會用到
  

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
    let bookingDataList = await postData(`bookings/sport/${selectedSport}`, {
      startDate: `${startYear}-${startMonth}-${startDay}`,
      endDate: `${endYear}-${endMonth}-${endDay}`
    })

    // generate date between start and end date
    const dateArray = [];
    const startDate = dayjs(`${startYear}-${startMonth}-${startDay}`);
    const endDate = dayjs(`${endYear}-${endMonth}-${endDay}`);
    const diff = endDate.diff(startDate, 'day');
    for (let i = 0; i <= diff; i++) {
      dateArray.push(startDate.add(i, 'day').format('YYYY/MM/DD'));
    }

    const fixedData = [
      {
        "dayCode": 0
      },
      {
        "dayCode": 1
      },
      {
        "dayCode": 2
      },
      {
        "dayCode": 3
      },
      {
        "dayCode": 4
      },
      {
        "dayCode": 5
      },
      {
        "dayCode": 6
      }
    ];

    // 用來讓 selectDateButton 取得日期
    const mergeData = dateArray.map((data, index) => {
      return {
        date: data.slice(5), // 用來顯示在 selectDateButton 上面，不需要年份
        fullDate: data, // 用來傳給 API
        dayCode: fixedData[index].dayCode,
        day: dayCodeToChineseDay(fixedData[index].dayCode),
      }
    })

    // console.log(mergeData);
    setDateCodeTable(mergeData);
    window.localStorage.setItem("Stadium-dateCodeTable", JSON.stringify(mergeData));
    
    // 把 bookingDataList.data key 爲時間的資料放到 weekStatus 裏面
    bookingDataList = Object.keys(bookingDataList.data).map(key => {
      const weekStatus = {};
      const nonDateData = {};

      Object.entries(bookingDataList.data[key]).forEach(([dataKey, value]) => {
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

    // 透過 id 去取得 stadium 資訊
    const stadiumData = [];
    for (let i = 0; i < bookingDataList.length; i++) {
      const stadiumId = bookingDataList[i].id;
      const stadiumResponse = await fetchData(`stadiums/stadium/${stadiumId}`);
      const stadiumInfo = stadiumResponse.data.stadium;

      // 取得屬於這個 stadium 的 court 資訊
      const courtResponse = await fetchData(`courts/courts/stadium/${stadiumId}`);
      const courtData = courtResponse.data.courts;
      stadiumInfo.courtNum = courtData.length;
      stadiumData.push(stadiumInfo);
    }

    // console.log(stadiumData);
    // 根據 stadium id 去把 stadium 資訊加到 bookingDataList 裏面
    for (let i = 0; i < bookingDataList.length; i++) {
      // 產生 timeList
      const openTime = stadiumData[i].openTime;
      const closeTime = stadiumData[i].closeTime;
      let currentHour = parseInt(openTime.split(':')[0]);
      const closeHour = parseInt(closeTime.split(':')[0]);
      const timeList = [];
      while (currentHour < closeHour) {
        timeList.push(`${currentHour.toString().padStart(2, '0')}:00`);
        currentHour++;
      }
      
      // 產生上午(12:00 前)、下午（12:00 ~ 18:00）、晚上（18:00 後） stadium 的總時間區塊數量
      const morningTimeList = timeList.filter(time => parseInt(time.split(":")[0]) <= 12);
      const afternoonTimeList = timeList.filter(time => parseInt(time.split(":")[0]) > 12 && parseInt(time.split(":")[0]) <= 18);
      const eveningTimeList = timeList.filter(time => parseInt(time.split(":")[0]) > 18);
      const morningSlotsPerDay = (morningTimeList.length - 1) * stadiumData[i].courtNum;
      const afternoonSlotsPerDay = (afternoonTimeList.length) * stadiumData[i].courtNum;
      const eveningSlotsPerDay = (eveningTimeList.length) * stadiumData[i].courtNum;

      bookingDataList[i].img_url = stadiumData[i].img_url;

      // 產生 weekStatus
      Object.keys(bookingDataList[i].weekStatus).forEach(key => {
        let dayBookingData = bookingDataList[i].weekStatus[key];
        const morningBookingSlots = dayBookingData[0]
        const afternoonBookingSlots = dayBookingData[1]
        const eveningBookingSlots = dayBookingData[2]

        // console.log(key);
        // console.log(morningBookingSlots, morningSlotsPerDay);
        // console.log(afternoonBookingSlots, afternoonSlotsPerDay);
        // console.log(eveningBookingSlots, eveningSlotsPerDay);

        // 上午狀態判斷
        if (morningBookingSlots >= morningSlotsPerDay) {
          bookingDataList[i].weekStatus[key][0] = "none";
        } else {
          bookingDataList[i].weekStatus[key][0] = "some";
        }

        // 下午狀態判斷
        if (afternoonBookingSlots >= afternoonSlotsPerDay) {
          bookingDataList[i].weekStatus[key][1] = "none";
        } else {
          bookingDataList[i].weekStatus[key][1] = "some";
        }

        // 晚上狀態判斷
        if (eveningBookingSlots >= eveningSlotsPerDay) {
          bookingDataList[i].weekStatus[key][2] = "none";
        } else {
          bookingDataList[i].weekStatus[key][2] = "some";
        }
      })
    }
    
    // console.log(bookingDataList);
    setStadiumData(bookingDataList);
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

  if (!stadiumData) {
    return(
      <div className="container mx-auto">
        <div className="w-full h-[calc(100vh-78px)] max-w-[1280px] flex justify-center items-center">
          <div className="scale-125">
            <l-mirage
            size="75"
            speed="2.5"
            color="black" 
            />
          </div>
        </div>
      </div>
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
              {/* <FilterButton/> */}
            </div>
          </div>
          {/* using tailwind scrollbar package to control scrollbar*/}
          <div className="w-full mx-auto relative mt-12 px-8 py-2 flex flex-row justify-start overflow-x-auto gap-[34px] snap-x scrollbar scrollbar-none scroll-smooth" ref={CarouselRef}>
            { stadiumData.map((stadiumData, index) => {
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

export default BookingStadiumPage
