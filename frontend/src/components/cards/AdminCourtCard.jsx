import {useState, useEffect, useContext, createContext} from "react"
import { useNavigate } from "react-router-dom";
import JoinContext from "../../contexts/JoinContext";
import FeatherIcon from "feather-icons-react";
// import TimePicker from "../input/TimerPicker"
import TimePickerDirection from "../directions/TimePickerDireaction";
import 'ldrs/ring2'


function TimeSlot({ isSelect, isAvalible, onEnter, onMouseDown }){
  let color = "";
  if (isAvalible) {
    color = isSelect ? "bg-light-green" : "bg-white";
  } else {
    color = "bg-silver";
  }

  return (
    <div
      onMouseDown={onMouseDown} // Bind the mouse down event
      onMouseEnter={onEnter}
      className={`w-full h-5 ${color}`}
    />
  );
};


function TimePicker({ timeList, slotsPerDay, notAvailableList}) {
  const [seletedList, setSelectedList] = useState(Array(slotsPerDay).fill(false)); // 追蹤每個時間區塊的選擇狀態
  
  // 根據 not avalible list 產生 avalible list
  const avalibleList = timeList.map(time => !notAvailableList.includes(time));
  
  // mergeList 是 seletedList 與 avalibleList 的合併
  const mergeList = seletedList.map((isSelect, index) => {
    return {
      isSelect: isSelect,
      isAvalible: avalibleList[index],
    }
  });

  return (
    <div 
      className="flex flex-row divide-x-1 divide-gray border-1 border-gray rounded-full overflow-hidden"
    >
      {mergeList.map((slot, index) => (
        <TimeSlot
          key={index}
          isSelect={slot.isSelect}
          isAvalible={slot.isAvalible}
        />
      ))}
    </div>
  )
}


function AdminCourtCard({court}){
  const courtName = court.courtName;
  const courtID = court.id;
  const timeList = court.timeList;
  const notAvailableList = court.notAvailableList
  // console.log("notAvailableList: ", notAvailableList);

  // 因爲 timeList 中的最後一項是結束時間，所以每天的時間區塊數量為 timeList.length - 1
  // slotsPerDay 控制了會有多少格時間區塊
  const slotsPerDay = timeList.length - 1

  const [startTime, setStartTime] = useState(timeList.slice(0, slotsPerDay - 1))
  const [endTime, setEndTime] = useState(timeList.slice(1, slotsPerDay))

  return (
    <div className="flex flex-col px-8 py-6 bg-white border-2 border-silver rounded-3xl shadow-[2px_4px_4px_1px_rgba(0,0,0,0.1)]">
      <p className="text-xl font-semibold mb-3">{courtName}</p>
      <div>
        <TimePicker timeList={timeList} slotsPerDay={slotsPerDay} notAvailableList={notAvailableList}/>
        <TimePickerDirection timeList={timeList} slotsPerDay={slotsPerDay}/>
      </div>
      <div className="flex flex-row h-10 mt-2 justify-end items-center">
        <button 
        className={`w-36 h-full flex justify-center items-center text-primary font-semibold bg-white border-1 border-primary rounded-full hover:bg-light-silver  duration-500`} 
        >
          <p>查看細節</p>
          <FeatherIcon icon="chevron-right" width="20" height="20" strokeWidth="5" className="ms-2"/>
        </button>
      </div>
    </div>
  )
}

export default AdminCourtCard;