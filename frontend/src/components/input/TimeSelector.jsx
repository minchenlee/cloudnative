import {useState, useEffect, useRef, useContext, createContext} from "react"
import useOutsideClick from "../../utilities/useOutsideClick";
import FeatherIcon from "feather-icons-react";
import 'ldrs/ring2'

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
      <div className={`relative w-20 font-robotoMono text-base`} onClick={toggleMenu}>
        <button className={`w-full`} onClick={toggleMenu}> {selectedOption ? selectedOption : defaultTitle} </button>
        <div ref={wrapperRef} className={`w-28 absolute -left-4 z-20 bg-white text-center border-silver overflow-scroll ${isOpen ? "rounded-3xl border-2 h-52"  : ""}`}>
          {isOpen && (
            <ul className="cursor-pointer">
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

function TimeSelector(props){
  // 編輯資料
  const editedData = props.editedData || [];
  const setEditedData = props.setEditedData || setEditedData;
  const openTime= editedData.time["openTime"] || null;
  const closeTime = editedData.time["closeTime"] || null;

  // create time list from 00:00 to 23:00
  const timeList = [];
  for (let hour = 0; hour <= 24; hour++) {
    const formattedHour = hour.toString().padStart(2, '0');
    const time = `${formattedHour}:00`;
    timeList.push(time);
  }

  // create not avalible time list
  const notAvailableList = [];

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
  const [startTime, setStartTime] = useState(openTime);
  const [endTime, setEndTime] = useState(closeTime);

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


  // 當時間改變時，更新編輯資料
  useEffect(()=>{
    const openTime = startTime || editedData.time["openTime"];
    const closeTime = endTime || editedData.time["closeTime"];
    const time = {openTime: openTime, closeTime: closeTime};
    setEditedData(editedData => ({...editedData, time: time}));
  }, [startTime, endTime])

  return(
    <div className="flex flex-row justify-between items-center relative gap-10">
        <SelectMenu defaultTitle="開始時間" optionList={startTimeList} addtionalClass="-left-4 -top-3" selectedOption={startTime} setSelectedOption={setStartTime}/>
        <div className="text-xl font-bold">~</div>
        <SelectMenu defaultTitle="結束時間" optionList={endTimeList} addtionalClass="-right-64 -top-3" selectedOption={endTime} setSelectedOption={setEndTime}/>
    </div>
  )
}

export default TimeSelector;