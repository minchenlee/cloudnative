import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import SportCard from "../components/cards/SportCard"
import {postData} from "../utilities/api"
import AllContext from "../contexts/AllContext"
import Modal from "../components/modals/Modal"
import FeatherIcon from "feather-icons-react"
import toast from "react-hot-toast"
import 'ldrs/ring'
import { jwtDecode } from "jwt-decode"


function BookingSucessPage(){
  const {selectedDayCode} = useContext(AllContext);

  // 從 local storage 取得 bookingInfo
  let bookingInfo = JSON.parse(window.localStorage.getItem("Stadium-bookingInfo"));
  const dateCodeTable = JSON.parse(window.localStorage.getItem("Stadium-dateCodeTable"));
  bookingInfo["day"] = dateCodeTable[selectedDayCode].day;
  bookingInfo["date"] = dateCodeTable[selectedDayCode].date;

  // 招募球友
  const {isModalOpen, setIsModalOpen} = useContext(AllContext);
  const handleFindMate = () => {
    setIsModalOpen(true);
  }

  // 查看預約記錄
  const navigate = useNavigate();
  const handleGoToRecord = () => {
    navigate('/records');
  }


  return(
    <div className="w-full h-[calc(100vh-76px)] bg-booking-success-bg bg-cover bg-center flex justify-center items-center">
      <div className={`flex flex-col w-[620px] h-[367px] bg-white bg-opacity-90 rounded-3xl pt-6 pb-10 px-16 mb-10`}>
        <div className={`flex flex-col h-full w-full justify-between pt-4 border-silver`}>
          <div className="flex flex-row items-center gap-4">
            <p className="text-2xl font-semibold">預約完成</p>
            <FeatherIcon icon="check-circle" width="32" height="32" strokeWidth="3" className="text-primary"/>
          </div>
          <Divider/>
          <div className="h-2/5 flex flex-col justify-center gap-6">
            <InfoRow 
              className=""
              text1={bookingInfo.stadiumName} 
              text2={bookingInfo.courtName}
            />
            <InfoRow 
              className="" 
              text1={`${bookingInfo.date} ${bookingInfo.day}`} 
              text2={`${bookingInfo.startTime} ~ ${bookingInfo.endTime}`}
              additionalClass="font-robotoMono"
            />
          </div>
          <Divider/>
          <div className="flex flex-row gap-8">
            <Button text="招募球友" bgColor="primary" textColor="white" borderColor="dark-gray" hoverColor="black" onClick={handleFindMate}/>
            <Button text="查看預約記錄" bgColor="white" textColor="black" borderColor="black" hoverColor="light-silver" onClick={handleGoToRecord}/>
          </div>
        </div>
      </div>
      <Modal width="38.75rem" height="23rem" title="招募球友" showClose={true} children={<FindMateModal/>}/>
    </div>
  )
}

function FindMateModal(){
  const {isModalOpen, setIsModalOpen} = useContext(AllContext);
  const [recruitNumber, setRecruitNumber] = useState(1);
  const [recruitNote, setRecruitNote] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);
  const [isMinusDisabled, setIsMinusDisabled] = useState(false);

  // 讓按鈕可以長按，連續增加招募人數
  const mouseDown = (e) => {
    e.preventDefault();
    const interval = setInterval(() => {
      setRecruitNumber(recruitNumber => recruitNumber + 1);
    }, 150);
    e.target.addEventListener('mouseup', () => clearInterval(interval));
  }

  // 讓按鈕可以長按，連續減少招募人數
  const mouseDown2 = (e) => {
    e.preventDefault();
    const intervalDecrease = setInterval(() => {
      setRecruitNumber(recruitNumber => recruitNumber - 1);
    }, 120);
    e.target.addEventListener('mouseup', () => clearInterval(intervalDecrease));
  }

  // 控制招募人數不得小於 0，並且控制減號按鈕的 disabled 狀態
  useEffect(() => {
    if (recruitNumber < 0) {
      setRecruitNumber(0);
    }

    if (recruitNumber === 0) {
      setIsMinusDisabled(true);
      return
    }

    setIsMinusDisabled(false);
  }, [recruitNumber])

  const navigate = useNavigate();
  const handleSubmmit = async() => {
    // console.log("招募人數：", recruitNumber);
    // console.log("附註：", recruitNote);
    setIsWaiting(true);

    const token = window.localStorage.getItem("Stadium-player-token");
    const bookingInfo = JSON.parse(window.localStorage.getItem("Stadium-bookingInfo"));
    const bookingId = bookingInfo.bookingId;
    const data = {
      userId: jwtDecode(token).id,
      note: recruitNote,
      capacity: recruitNumber,
    }

    const response = await postData(`activities/${bookingId}`, data);
    if (response.msg === "Activity created successfully.") {
      toast.success("發佈招募成功！");
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/records')
      }, 1200);

    } else {
      toast.error("發佈招募失敗！");
      setTimeout(() => {
        setIsWaiting(false);
        setIsModalOpen(false);
      }, 1200);
    }
  }


  return(
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-row items-center gap-5">
        <p className="text-base font-semibold">招募人數：</p>
        <div className="flex flex-row items-center font-robotoMono gap-4">
          <NumButton 
          icon="minus" 
          onClick={() => setRecruitNumber(recruitNumber-1)} 
          isMinusDisabled={isMinusDisabled}
          onMouseDown={mouseDown2}
          bgColor="white" textColor="primary" borderColor="primary" hoverColor="light-silver"/>
          <p className="font-bold text-xl w-8 text-center">{recruitNumber}</p>
          <NumButton 
          icon="plus" 
          onClick={() => setRecruitNumber(recruitNumber+1)} 
          onMouseDown={mouseDown} 
          bgColor="primary" textColor="white" borderColor="primary" hoverColor="light-silver"/>
        </div>
      </div>
      <div className="flex flex-col h-3/5">
        <p className="text-base font-semibold mb-4">附註：</p>
        <textarea 
        onChange={e => setRecruitNote(e.target.value)}
        className="w-full h-full border-2 border-silver rounded-2xl px-2 pt-1 resize-none bg-opacity-0"/>
      </div>
      <button 
      onClick={handleSubmmit}
      className="w-full h-10 font-semibold bg-primary text-white rounded-full hover:bg-black duration-500 flex justify-center items-center">
        {isWaiting 
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
        <p>發佈招募</p>}
      </button>
    </div>
  )
}



function InfoRow({text1, text2, additionalClass}){
  return(
    <div className={`flex flex-row items-center text-base font-semibold ${additionalClass}`}>
      <p className="w-1/4">{text1}</p>
      <p className="w-3/4 ps-10">{text2}</p>
    </div>
  )
}

function Button({text, onClick, bgColor, textColor, borderColor, hoverColor}){
  return (
    <button className={`h-11 w-full font-medium text-${textColor} bg-${bgColor} border-1 border-${borderColor} rounded-full flex items-center justify-center hover:bg-${hoverColor} transition duration-300`}
    onClick={onClick}>
      {text}
    </button>
  )
}

function NumButton({icon, onClick, isMinusDisabled, onMouseDown, bgColor, textColor, borderColor}){
  return (
    <button 
    onClick={onClick} 
    onMouseDown={onMouseDown}
    className={`h-6 w-6 border-4 border-${borderColor} bg-${bgColor} rounded-full relative duration-500 ${isMinusDisabled ? "opacity-40 cursor-default" : ""}`}
    >
      <FeatherIcon icon={icon} width="16" height="16" strokeWidth="4" className={`text-${textColor} absolute top-1/2 transform -translate-y-1/2`}/>
      <div className="border-primary display-none"></div>
    </button>
  )
}

function Divider(){
  return(
    <span className="border-b-2 border-silver"></span>
  )
}



export default BookingSucessPage
