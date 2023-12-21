import { useState, useContext } from "react"
import AllContext from "../../contexts/AllContext";
import { Link, useLocation } from "react-router-dom"
import StatusDot from "../general/StatusDot";

// 上午、下午、晚上的狀態列
function StatusColumn(props){
  const day = props.day || "";
  const dayStatus = props.dayStatus || "";

  return(
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-bold text-dark-gray mb-2">{day}</p>
      <StatusDot status={dayStatus[0]}/>
      <StatusDot status={dayStatus[1]}/>
      <StatusDot status={dayStatus[2]}/>
      {/* <StatusDot status={dayStatus.morning}/>
      <StatusDot status={dayStatus.afternoon}/>
      <StatusDot status={dayStatus.evening}/> */}
    </div>
  )
}

// 一週的狀態
function StatusGrid(props) {
  const weekStatus = props.weekStatus || "";
  const weekStatusArray = Object.values(weekStatus);
  
  function Weekday(props) {
    return(
      <div className="flex gap-2">
        <StatusColumn day="Mon" dayStatus={weekStatusArray[1]}/>
        <StatusColumn day="Tue" dayStatus={weekStatusArray[2]}/>
        <StatusColumn day="Wed" dayStatus={weekStatusArray[3]}/>
        <StatusColumn day="Thu" dayStatus={weekStatusArray[4]}/>
        <StatusColumn day="Fri" dayStatus={weekStatusArray[5]}/>
      </div>
    )
  }

  return (
    <div className="flex justify-between w-full">
      <StatusColumn day="Sun" dayStatus={weekStatusArray[0]}/>
      <Weekday/>
      <StatusColumn day="Sat" dayStatus={weekStatusArray[6]}/>
    </div>
  );
}


function StadiumCard({stadiumData}) {
  const {selectedSport} = useContext(AllContext);
  const img_url = stadiumData.img_url || "";
  const name = stadiumData.name || "";
  const isIndoor = stadiumData.isIndoor || "";
  const numberOfCourts = stadiumData.numberOfCourts || "";
  const weekStatus = stadiumData.weekStatus || "";

  // get current url
  const location = useLocation();
  const currentPage = location.pathname.split("/").pop();

  let defalutImage;
  switch (selectedSport) {
    case "basketball":
      defalutImage = "bg-default-court-basketball";
      break;
    case "badminton":
      defalutImage = "bg-default-court-badminton";
      break;
    case "tennis":
      defalutImage = "bg-default-court-tennis";
      break;
    case "volleyball":
      defalutImage = "bg-default-court-volleyball";
      break;
    case "tabletennis":
      defalutImage = "bg-default-court-tabletennis";
      break;
  }
    

  return (
      <Link to={`/booking/${currentPage}/detail?day=sun&id=${stadiumData.id}`} className="relative w-[340px] h-[480px] group flex flex-col items-center rounded-3xl shadow-[2px_4px_8px_1px_rgba(0,0,0,0.25)] overflow-hidden shrink-0 snap-center">
        <div className="opacity-0 group-hover:opacity-100 absolute top-20 z-30 font-semibold text-white tracking-wide transition duration-300">
          <p>查看詳細資訊</p>
        </div>
        <div className={`w-full h-2/5 rounded-3xl overflow-hidden group-hover:blur-sm group-hover:brightness-90 transition duration-500`}>
          {img_url === "" || "none"
          ? 
          <div className={`w-full h-full object-contain ${defalutImage} bg-cover`}/> 
          :
          <img src={img_url} alt="" className="w-full h-full object-cover"/>
          }
        </div>
        <div className="w-full h-3/5 px-6 flex flex-col items-start">
          <p className="text-xl font-medium text-center mt-2">{name}</p>
          <div className="flex flex-row gap-4 w-full mt-1 text-base font-semibold text-dark-gray">
            <p className="">{isIndoor ? "室內" : "室外"}</p>
            <p className="">{numberOfCourts} 個球場</p>
          </div>
          <div className="mt-11 w-full">
            <StatusGrid weekStatus={weekStatus}/>
          </div>
        </div>
      </Link>
  );
};

export default StadiumCard;
