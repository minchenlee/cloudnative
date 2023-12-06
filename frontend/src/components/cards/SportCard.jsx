import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import JoinContext from "../../contexts/JoinContext";


function SportCard(props) {
  const { selectedDayCode, setSelectedDayCode, selectedSport, setSelectedSport } = useContext(JoinContext);
  const text = props.text || "";
  const sport = props.sport || "";
  const bg = props.bg || "";
  const link = props.link || "";

  function BackUpBackground(){
    return(
      <div className={`z-0 absolute w-full h-full bg-black blur-sm`}/>
    )
  }
  

  return (
    <div className={`group relative z-0 w-[348px] h-[348px]  ${bg} rounded-3xl overflow-hidden`} onClick={()=> setSelectedSport(sport)}>
      <Link to={link}>
      <div className={`z-10 absolute w-full h-full ${bg} bg-contain blur-sm contrast-110 brightness-75 group-hover:scale-110 transition duration-500`}/>
      <BackUpBackground/>
      <div className="z-20 absolute w-full h-full flex justify-center items-center rounded-3xl ">
        <span className="font-bold text-white text-2xl text-center">
          {text}
        </span>
      </div>
      </Link>
    </div>
  );
};

export default SportCard;
