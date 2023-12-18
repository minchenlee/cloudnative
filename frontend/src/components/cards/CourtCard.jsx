import {useState, useEffect, useRef, useContext, createContext} from "react"
import { useNavigate } from "react-router-dom";
import useOutsideClick from "../../utilities/useOutsideClick";
import JoinContext from "../../contexts/JoinContext";
import FeatherIcon from "feather-icons-react";
import TimePicker from "../input/TimerPicker"
import TimePickerDirection from "../directions/TimePickerDireaction";
import 'ldrs/ring2'
import 'animate.css';


// Select Menu
function SelectMenu({defaultTitle, optionList, addtionalClass, selectedOption, setSelectedOption}) {
  // const formattedOptionList = optionList.map(option => option.split(':')[0]);
  // 控制選單顯示
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  // 處理點擊 component 外的事件
  const handleClickOutside = () => {
    setIsOpen(false);
  }
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, handleClickOutside);

  return (
    <div className={`relative w-20 font-robotoMono`} onClick={toggleMenu}>
      <button className={`w-full z-20`} onClick={toggleMenu}> {selectedOption ? selectedOption : defaultTitle} </button>
      <div ref={wrapperRef} className={`w-28 absolute -left-4 z-20 bg-white text-base text-center border-silver overflow-scroll ${isOpen ? "rounded-3xl border-2 h-52"  : ""}`}>
        {isOpen && (
          <ul className="cursor-pointer z-30">
            {optionList.map((option) => (
              <li className="cursor-pointer py-2 hover:bg-silver" key={option} onClick={() => handleOptionClick(option)}>
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


function CourtCard({court}){
  const courtName = court.courtName;
  const courtID = court.id;
  const timeList = court.timeList;
  const notAvailableList = court.notAvailableList
  // console.log("notAvailableList: ", notAvailableList);

  // 因爲 timeList 中的最後一項是結束時間，所以每天的時間區塊數量為 timeList.length - 1
  // slotsPerDay 控制了會有多少格時間區塊
  const slotsPerDay = timeList.length - 1

  // 把不可選擇的時間從 startTimeList 中移除
  const filterNotAvalible4Start = (timeList) => {
    return timeList.filter(time => !notAvailableList.includes(time));
  }

  // 把不可選擇得時間的從 endTimeList 中移除，做另外處理是因為結尾時間要比開始時間晚一個時間區塊
  const filterNotAvalible4End = (timeList) => {
    // convert hour to number and plus 1
    const timePlusOne = (time) => {
      const hour = time.split(':')[0];
      const newHour = parseInt(hour) + 1;
      return newHour.toString().padStart(2, '0') + ":00";
    }
  
    const endNotAvailableList = notAvailableList.map(time => timePlusOne(time))
    return timeList.filter(time => !endNotAvailableList.includes(time));
  }

  // 找出比 endTime 早，且最接近 endTime 的 not avalible time
  const upperTimeBoundary = (endTime) => {
    const endTimeIndex = timeList.indexOf(endTime);
    let upperTimeBoundary;

    // 在所有比 endTime 早的 not avalible time 中，最晚的那一個就是 upperTimeBoundary
    const smallerThanEndTime = notAvailableList.filter(time => timeList.indexOf(time) < endTimeIndex);
    upperTimeBoundary = smallerThanEndTime.slice(-1)[0];
    upperTimeBoundary = timeList.indexOf(upperTimeBoundary);

    if (upperTimeBoundary === -1) {
      upperTimeBoundary = 0;
    }

    // console.log("upperTimeBoundary: ", upperTimeBoundary);
    return upperTimeBoundary;
  }

  // 找出比 startTime 晚，且最接近 startTime 的 not avalible time
  const lowerTimeBoundary = (startTime) => {
    const startTimeIndex = timeList.indexOf(startTime);
    let lowerTimeBoundary;

    // 在所有比 startTime 晚的 not avalible time 中，最早的那一個就是 lowerTimeBoundary
    lowerTimeBoundary = notAvailableList.find(time => timeList.indexOf(time) > startTimeIndex);
    lowerTimeBoundary = timeList.indexOf(lowerTimeBoundary);

    if (lowerTimeBoundary === -1) {
      lowerTimeBoundary = slotsPerDay;
    }

    // console.log("lowerTimeBoundary: ", lowerTimeBoundary);
    return lowerTimeBoundary;
  }

  // 用 filterNotAvalible 過濾掉不可選擇的時間區塊
  // startTime 不得為最後一個時間區塊，endTime 不得為第一個時間區塊
  const cleanStartTime = filterNotAvalible4Start(timeList.slice(0, slotsPerDay - 1));
  const cleanEndTime = filterNotAvalible4End(timeList.slice(1, slotsPerDay));

  // 紀錄 startTimeList 與 endTimeList
  const [startTimeList, setStartTimeList] = useState(cleanStartTime)
  const [endTimeList, setEndTimeList] = useState(cleanEndTime)

  // 紀錄使用者選擇的開始時間與結束時間 
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // 對 startTime 與 endTime 做監聽，當其中一個改變時，更新另一個的選項
  useEffect(() => {
    //確保 end time 不會早於 start time
    if (startTime) {
      let newEndTimeList = timeList.slice(timeList.indexOf(startTime) + 1, lowerTimeBoundary(startTime) + 1);
      newEndTimeList = filterNotAvalible4End(newEndTimeList)
      setEndTimeList(newEndTimeList);
    }

    // 確保 start time 不會晚於 end time，且不會相同
    if (endTime) {
      let newStartTimeList = timeList.slice(upperTimeBoundary(endTime), timeList.indexOf(endTime));
      // newStartTimeList = newStartTimeList.slice(lowerTimeBoundary(endTime));
      newStartTimeList = filterNotAvalible4Start(newStartTimeList)
      setStartTimeList(newStartTimeList);
    }

    // 當取消選取時，將 startTimeList 與 endTimeList 重置
    if (startTime === null && endTime === null) {
      setStartTimeList(filterNotAvalible4Start(timeList.slice(0, slotsPerDay - 1)));
      setEndTimeList(filterNotAvalible4End(timeList.slice(1, slotsPerDay)));
    }

    // console.log("startTime: ", startTime);
    // console.log("endTime: ", endTime);
  }, [startTime, endTime]);


  // 如果使用者已經選擇過時間，則將時間設定為上次選擇的時間
  useEffect(() => {
    const bookingInfo = JSON.parse(window.localStorage.getItem("Stadium-bookingInfo"));
    // 如果沒有 bookingInfo，則不載入上次選擇的時間
    if (!bookingInfo) return;
    
    const savedCourtID = bookingInfo.courtID;
    // 如果使用者當初按下預約的場地不是現在這個場地，則不將時間設定為上次選擇的時間
    if (savedCourtID !== courtID) return;

    const savedStartTime = bookingInfo.startTime;
    const savedEndTime = bookingInfo.endTime;
    setStartTime(savedStartTime);
    setEndTime(savedEndTime);
  }, [])



  // 送出加入 request
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isNull, setIsNull] = useState(false);
  const handleJoin = () => {
    // 檢查是否有選擇時間，沒有的話就不做任何事，觸發 isNull 的動畫
    if (startTime === null || endTime === null) {
      setIsNull(true);
      setTimeout(() => {
        setIsNull(false);
      }, 500);
      return;
    }

    // 將 bookingInfo 存入 localStorage
    const bookingInfo = {
      courtID: courtID,
      courtName: courtName,
      startTime: startTime,
      endTime: endTime,
    }
    window.localStorage.setItem("Stadium-bookingInfo", JSON.stringify(bookingInfo));

    
    // wait 2 sec and then set isProcessing to false, useNavigate to /record
    // 假裝 call API 並等待 2 秒 (實際上是直接跳轉到 /record)
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/booking/confirm");
    }, 1500);
  }

  return (
    <div className="flex flex-col px-8 py-6 bg-white border-2 border-silver rounded-3xl shadow-[2px_4px_4px_1px_rgba(0,0,0,0.1)]">
      <p className="text-xl font-semibold mb-3">{courtName}</p>
      <div>
        <TimePicker timeList={timeList} slotsPerDay={slotsPerDay} notAvailableList={notAvailableList} startTime={startTime} endTime={endTime} setStartTime={setStartTime} setEndTime={setEndTime}/>
        <TimePickerDirection timeList={timeList} slotsPerDay={slotsPerDay}/>
      </div>
      <div className="flex flex-row h-10 mt-2 justify-between items-center">
        <div className="flex flex-row gap-10">
          <SelectMenu defaultTitle="開始時間" optionList={startTimeList} selectedOption={startTime} setSelectedOption={setStartTime}/>
          <FeatherIcon icon="chevrons-right" width="24" height="24" strokeWidth="2"/>
          <SelectMenu defaultTitle="結束時間" optionList={endTimeList} selectedOption={endTime} setSelectedOption={setEndTime}/>
        </div>
        <button 
        onClick={handleJoin}
        className={`w-24 h-full flex justify-center items-center text-white font-semibold bg-primary rounded-full hover:bg-black  duration-500 animate__animated ${isNull ? "animate__headShake" : ""}`} 
        >
          {isProcessing
          ?
          <l-ring-2
            size="24"
            stroke="5"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.7"
            color="white" 
          ></l-ring-2> 
          :
          <p>預約</p>
          }
        </button>
      </div>
    </div>
  )
}

export default CourtCard;