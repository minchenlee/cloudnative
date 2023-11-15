import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import StatusDot from "../general/StatusDot";

// 上午、下午、晚上的狀態列
function StatusColumn(props){
  const day = props.day || "";
  const dayStatus = props.dayStatus || "";

  return(
    <div className="flex flex-col items-center gap-2">
      <p className="text-sm font-bold text-dark-gray mb-2">{day}</p>
      <StatusDot status={dayStatus.morning}/>
      <StatusDot status={dayStatus.afternoon}/>
      <StatusDot status={dayStatus.evening}/>
    </div>
  )
}

// 一週的狀態
function StatusGrid(props) {
  const weekStatus = props.weekStatus || "";
  
  function Weekday(props) {
    return(
      <div className="flex gap-2">
        <StatusColumn day="Mon" dayStatus={weekStatus.Mon}/>
        <StatusColumn day="Tue" dayStatus={weekStatus.Tue}/>
        <StatusColumn day="Wed" dayStatus={weekStatus.Wed}/>
        <StatusColumn day="Thu" dayStatus={weekStatus.Thu}/>
        <StatusColumn day="Fri" dayStatus={weekStatus.Fri}/>
      </div>
    )
  }

  return (
    <div className="flex justify-between w-full">
      <StatusColumn day="Sun" dayStatus={weekStatus.Sun}/>
      <Weekday/>
      <StatusColumn day="Sat" dayStatus={weekStatus.Sat}/>
    </div>
  );
}


function StadiumCard({stadiumData}) {
  const img_url = stadiumData.img_url || "";
  const name = stadiumData.name || "";
  const inOrOut = stadiumData.inOrOut || "";
  const numberOfCourts = stadiumData.numberOfCourts || "";
  const weekStatus = stadiumData.weekStatus || "";

  // get current url
  const location = useLocation();
  const currentPage = location.pathname.split("/").pop();

  return (
      <Link to={`/booking/${currentPage}/detail/sun`} className="relative w-[340px] h-[480px] group flex flex-col items-center rounded-3xl shadow-[2px_4px_8px_1px_rgba(0,0,0,0.25)] overflow-hidden shrink-0 snap-center">
        <div className="opacity-0 group-hover:opacity-100 absolute top-20 z-30 font-semibold text-white tracking-wide transition duration-300">
          <p>查看詳細資訊</p>
        </div>
        <div className={`w-full h-2/5 rounded-3xl overflow-hidden group-hover:blur-sm group-hover:brightness-90 transition duration-500`}>
          <img src={img_url} alt="" className="w-full h-full object-cover"/>
        </div>
        <div className="w-full h-3/5 px-6 flex flex-col items-start">
          <p className="text-xl font-medium text-center mt-2">{name}</p>
          <div className="flex flex-row gap-4 w-full mt-1 text-base font-semibold text-dark-gray">
            <p className="">{inOrOut}</p>
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
