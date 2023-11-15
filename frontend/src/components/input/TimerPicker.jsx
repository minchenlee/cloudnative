import { useState, useCallback, useEffect } from 'react';


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
      className={`w-full h-5 cursor-pointer ${color}`}
    />
  );
};


function TimePicker({ timeList, slotsPerDay, notAvailableList, startTime, endTime, setStartTime, setEndTime}) {
  const [isAdjacent, setIsAdjacent] = useState(true); // 追蹤是否在選擇相鄰的時間區塊
  const [isDragging, setIsDragging] = useState(false); // 追蹤是否正在拖曳
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

  // 當使用者按下時間區塊時，將該時間區塊設為選擇狀態
  const toggleSlot = useCallback((index) => {
    setSelectedList(prev => {
      const newselected = [...prev];
      newselected[index] = !newselected[index];
      return newselected;
    });
  }, []);


  // 檢查是否為相鄰的時間區塊
  const isAdjacentSlot = useCallback((index) => {
    const firstSelectedSlot = seletedList.indexOf(true);
    const lastSelectedSlot = seletedList.lastIndexOf(true);

    // 沒有任何時間區塊被選擇的情形
    if (firstSelectedSlot === -1) {
      setIsAdjacent(true);
      return;
    }
    
    if (index < firstSelectedSlot - 1 || index > lastSelectedSlot + 1) {
      setIsAdjacent(false);
      return;
    } 

    setIsAdjacent(true);
  }, [seletedList]);


  // 當使用者移動滑鼠時，若正在拖曳，則將該時間區塊設為選擇狀態
  const handleMouseEnter = index => {

    // 檢查是否為相鄰的時間區塊，若不是則不做任何事
    isAdjacentSlot(index);
    if (!isAdjacent) {
      return;
    }

    if (isDragging && avalibleList[index]) {
      toggleSlot(index);
    }
  };


  // 當使用者移出時間區塊時，將該時間區塊設為非選擇狀態
  const handleMouseLeave = () => {
    setIsAdjacent(false);
  }
  

  // 當使用者按下滑鼠時，將該時間區塊設為選擇狀態
  const handleMouseDown = index => {
    // 檢查是否為相鄰的時間區塊，若不是則不做任何事
    isAdjacentSlot(index);
    if ((!isAdjacent) || !avalibleList[index]) {
      return;
    }

    // 若已經有時間區塊被選擇，更改所有時間區塊為非選擇狀態
    if (seletedList[index]=== true && seletedList.some(timeSlot => timeSlot === true)) {
      setSelectedList(Array(slotsPerDay).fill(false));
      setStartTime(null);
      setEndTime(null);
      return;
    }

    setIsDragging(true); // Set dragging to true on mouse down
    toggleSlot(index);
  };

  const handleMouseUp = () => {
    setIsDragging(false); // Set dragging to false on mouse up
  };


  // 當使用者選擇完時間區塊後，確保選擇的時間區塊是連續的，不連續則取消選擇
  useEffect(() => {
    const firstSelectedSlot = seletedList.indexOf(true);
    const lastSelectedSlot = seletedList.lastIndexOf(true);

    // 沒有任何時間區塊被選擇的情形 
    if (firstSelectedSlot === -1) {
      return;
    }

    // 確保選擇的時間區塊是連續的
    if (seletedList.slice(firstSelectedSlot, lastSelectedSlot + 1).some(slot => slot === false)){
      setSelectedList(Array(slotsPerDay).fill(false));
      return;
    }

    setStartTime(timeList[seletedList.indexOf(true)]);
    setEndTime(timeList[seletedList.lastIndexOf(true) + 1]);

  }, [seletedList]);


  // 這一組和上面那一組造成了迴圈
  useEffect(() => {
    if (startTime && endTime) {
      const newSlotList = Array(slotsPerDay).fill(false);
      const startIndex = timeList.indexOf(startTime);
      const endIndex = timeList.indexOf(endTime) - 1;

      for (let i = startIndex; i <= endIndex; i++) {
        newSlotList[i] = true;
      }
      setSelectedList(newSlotList);
    }
  }, [startTime, endTime]);


  return (
    <div 
      onMouseUp={handleMouseUp} // Bind the mouse up event to the container
      onMouseLeave={handleMouseLeave}
      className="flex flex-row divide-x-1 divide-gray border-1 border-gray rounded-full overflow-hidden"
    >
      {mergeList.map((slot, index) => (
        <TimeSlot
          key={index}
          isSelect={slot.isSelect}
          isAvalible={slot.isAvalible}
          onEnter={() => handleMouseEnter(index)}
          onMouseDown={() => handleMouseDown(index)} // 讓 time slot 被按下時，呼叫 handleMouseDown
        />
      ))}
    </div>
  );
};

export default TimePicker;
