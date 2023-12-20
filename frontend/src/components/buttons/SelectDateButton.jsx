import { useState, useContext, useEffect, useRef } from "react"
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import useOutsideClick from "../../utilities/useOutsideClick";
import AllContext from "../../contexts/AllContext"
import FeatherIcon from 'feather-icons-react';
import { dayToDayCode, dayCodeToDay, dayCodeToChineseDay } from "../../utilities/DayCodeConverter";


function SelectDateButton() {
  // 取得日期清單
  const dateCodeTable = JSON.parse(window.localStorage.getItem("Stadium-dateCodeTable"));
  
  // 透過 Context 取得當前選擇的日期和運動項目
  const { selectedDayCode, setSelectedDayCode, selectedSport, setSelectedSport } = useContext(AllContext);

  // 處理日期選擇
  // 預設日期為當前頁面的日期
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(dateCodeTable[selectedDayCode].date);
  const [selectedDay, setSelectedDay] = useState(dateCodeTable[selectedDayCode].day);
  
  // get current url, beside the root url
  const location = useLocation();
  let currentPage = location.pathname
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("day"))
  // console.log(searchParams.get("id"))

  const handleSelectedDate = (date, day, dayCode) => {
    setSelectedDayCode(dayCode);
    window.localStorage.setItem("Stadium-selectedDayCode", dayCode);
    setSelectedDate(date);
    setSelectedDay(dayCodeToChineseDay(dayCode));
    navigate(`${currentPage}?day=${dayCodeToDay(dayCode)}&id=${searchParams.get("id")}`);
    setIsSelecting(false);
  }

  // 重新 call API
  useEffect(() => {
    // call API
    // console.log(`calling api: ${selectedDayCode}`);
  }, [selectedDayCode])

  // 處理日期清單的顯示
  const [isSelecting, setIsSelecting] = useState(false);
  const handleSelecting = () => {
    setIsSelecting(!isSelecting);
  }

  // 取得今天的日期
  let currentDate = new Date().toISOString().slice(0, 10);
  currentDate = currentDate.replaceAll("-", "/")

  // 把初始選擇的 dayCode 設為可選的第一個日期
  useEffect(() => {
    // 如果原本選擇的日期是可選的，就不用改變
    if (dateCodeTable[selectedDayCode].fullDate >= currentDate) {
      return;
    }

    // 找出第一個可選的日期
    for (let i = 0; i < dateCodeTable.length; i++) {
      if (dateCodeTable[i].fullDate >= currentDate) {
        setSelectedDayCode(dateCodeTable[i].dayCode);
        window.localStorage.setItem("Stadium-selectedDayCode", dateCodeTable[i].dayCode);
        setSelectedDate(dateCodeTable[i].date);
        setSelectedDay(dayCodeToChineseDay(dateCodeTable[i].dayCode));
        break;
      }
    }
  }, [])

  // 日期選項按鈕
  function CandidateButton({ date, fullDate, day, dayCode}) {
    // 今天以前的日期不可選
    if (fullDate < currentDate) {
      return(
        <button 
        className={`text-gray text-xl font-bold w-full px-5 py-5 flex gap-3 items-center cursor-default`} 
        disabled>
          <p className="font-robotoMono">{date}</p>
          <p className="">{day}</p>
        </button>
      )
    }
  
    return(
      <button 
      className={`text-dark-gray text-xl font-bold w-full px-5 py-5 flex gap-3 items-center hover:bg-light-silver`} 
      onClick={() => handleSelectedDate(date, day, dayCode)}>
        <p className="font-robotoMono">{date}</p>
        <p className="">{day}</p>
      </button>
    )
  }

  // 處理點擊 component 外的事件
  const handleClickOutside = () => {
    setIsSelecting(false);
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, handleClickOutside);

  return (
    <div className="relative">
      <button className={`text-dark-gray text-xl font-bold bg-white w-42 px-5 py-5 rounded-full border-solid border-silver border-2 shadow-md flex gap-3 items-center`} onClick={handleSelecting} >
        <p className="font-robotoMono">{selectedDate}</p>
        <p className="">{selectedDay}</p>
        <span className="ms-1">
          <FeatherIcon icon="calendar" width="24" height="24" strokeWidth="3"/>
        </span>
      </button>
      <div ref={wrapperRef} className={`absolute top-20 flex flex-col bg-white w-full border-1 border-silver shadow-md rounded-3xl overflow-hidden ${isSelecting ? "" : "invisible"}`}>
        {dateCodeTable && dateCodeTable.map(({ date, fullDate, day, dayCode }) => (
          <CandidateButton key={date} date={date} fullDate={fullDate} day={day} dayCode={dayCode}/>
        ))}
      </div>
    </div>
  );
};

export default SelectDateButton;
