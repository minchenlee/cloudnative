import {useState, useEffect, useContext} from "react"

function TimeSlot({time}){
  const isSeperate = time === "12" || time === "18";

  return (
    <div className={`w-full h-5 ${isSeperate ? "font-semibold": ""}`}>
      {time}
    </div>
  );
};

function TimePickerDirection({timeList, slotsPerDay}){
  // 把 08:00 轉換成 08 顯示，較為美觀
  let formattedTimesList = timeList.map(option => option.split(':')[0]);

  // 如果 timeList 有 16 個時間，則 slotPerDay 為 15，因爲最後一個時間區塊不會顯示
  formattedTimesList = formattedTimesList.splice(0, slotsPerDay);

  return(
    <div className={`flex flex-row text-sm`}>
      {
        formattedTimesList.map((slot, index) => (
          <TimeSlot key={index} time={slot}/>
        ))
      }
    </div>
  )
}

export default TimePickerDirection;