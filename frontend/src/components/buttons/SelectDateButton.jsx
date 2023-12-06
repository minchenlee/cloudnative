import { useState, useContext, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom";
import JoinContext from "../../contexts/JoinContext"
import FeatherIcon from 'feather-icons-react';
import { dayToDayCode, dayCodeToDay, dayCodeToChineseDay } from "../../utilities/DayCodeConverter";


function SelectDateButton() {
  // 取得當前取得的場地資訊
  const joinJson = JSON.parse(window.localStorage.getItem("joinJson"));

  // 透過 Context 取得當前選擇的日期和運動項目
  const { selectedDayCode, setSelectedDayCode, selectedSport, setSelectedSport } = useContext(JoinContext);

  // 處理日期選擇
  // 預設日期為當前頁面的日期
  const navigate = useNavigate();
  // const [selectedDayCode, setSelectedDayCode] = useState(dayTodayCode(currentPage)); 
  const [selectedDate, setSelectedDate] = useState(joinJson[selectedDayCode].date);
  const [selectedDay, setSelectedDay] = useState(joinJson[selectedDayCode].day);
  
  // get current url, beside the root url
  const location = useLocation();
  let currentPage = location.pathname.split("/")
  currentPage = currentPage.slice(0, -1).join("/")

  const handleSelectedDate = (date, day, dayCode) => {
    setSelectedDayCode(dayCode);
    setSelectedDate(date);
    setSelectedDay(dayCodeToChineseDay(dayCode));
    navigate(`${currentPage}/${dayCodeToDay(dayCode)}`);
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

  // 日期選項按鈕
  function CandidateButton({ date, day, dayCode}) {
    return(
      <button className={`text-dark-gray text-xl font-bold w-full px-5 py-5 flex gap-3 items-center hover:bg-light-silver`} onClick={() => handleSelectedDate(date, day, dayCode)}>
        <p className="font-robotoMono">{date}</p>
        <p className="">{day}</p>
      </button>
    )
  }

  return (
    <div className="relative">
      <button className={`text-dark-gray text-xl font-bold bg-white w-42 px-5 py-5 rounded-full border-solid border-silver border-2 shadow-md flex gap-3 items-center`} onClick={handleSelecting} >
        <p className="font-robotoMono">{selectedDate}</p>
        <p className="">{selectedDay}</p>
        <span className="ms-1">
          <FeatherIcon icon="calendar" width="24" height="24" strokeWidth="3"/>
        </span>
      </button>
      <div className={`absolute top-20 flex flex-col bg-white w-full border-1 border-silver shadow-md rounded-3xl overflow-hidden ${isSelecting ? "" : "invisible"}`}>
        {joinJson && joinJson.map(({ date, day, dayCode }) => (
          <CandidateButton key={date} date={date} day={day} dayCode={dayCode}/>
        ))}
      </div>
    </div>
  );
};

export default SelectDateButton;
