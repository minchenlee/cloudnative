import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import AllContext from "../../contexts/AllContext";
import { dayToDayCode, dayCodeToDay, dayCodeToChineseDay } from "../../utilities/DayCodeConverter";

function MateDayStatusCard(props) {
  const date = props.date || "";
  const activitiesNum = props.activitiesNum;
  const day = props.day || "";
  const link = props.link || "";

  const { selectedDayCode, setSelectedDayCode } = useContext(AllContext);
  const handleDayClick = (link) => {
    const dayCode = dayToDayCode(link.split("/").pop());
    setSelectedDayCode(dayCode);
  }

  return (
    <Link to={link}  className="flex flex-row items-center w-[92%] px-7 py-8 border-2 border-silver rounded-3xl shadow-[2px_4px_6px_1px_rgba(0,0,0,0.15)]" onClick={() => handleDayClick(link)}>
      <div className="w-2/3 flex flex-rol items-center gap-7 text-xl font-semibold">
        <p>{day}</p>
        <p className="font-robotoMono">{date}</p>
        <div className="w-20 grid grid-cols-2 gap-3 items-center">
          <p className="text-2xl text-center font-robotoMono font-semibold">{activitiesNum}</p>
          <p className="text-center">場</p>
        </div>
      </div>
      <div className="w-1/3 flex items-center justify-center">
        <p className="text-base font-medium text-white bg-primary px-12 py-2 rounded-full">查看</p>
      </div>
    </Link>
  );
};

export default MateDayStatusCard;