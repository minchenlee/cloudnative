import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import JoinContext from "../contexts/JoinContext"
import BackButton from "../components/buttons/BackButton"
import Modal from "../components/modals/Modal"
import 'ldrs/ring2'

function LogInModal(){
  const { email, setEmail, password, setPassword, setIsModalOpen } = useContext(JoinContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // 這邊假裝 call API 並等待 1.5 秒 (實際上是直接跳轉到 /booking)
  useEffect(() => {
    if (isProcessing){
      setTimeout(() => {
        setIsModalOpen(false);
        setIsProcessing(false);
        navigate("/booking/success");
      }, 1500);
    }
  }, [isProcessing])

  const handleSubmit = () => {
    setIsProcessing(true);
  }

  return(
    <div className="flex flex-col gap-6">
      <input 
        className="w-full h-7 ps-2 border-1 rounded-md bg-transparent" 
        placeholder="電子郵件" 
        type="email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full h-7 ps-2 border-1 rounded-md bg-transparent"
        placeholder="密碼"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full font-medium text-white bg-primary rounded-full h-9 flex items-center justify-center" 
      onClick={handleSubmit}>
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
          <p>登入</p>
        }
      </button>
    </div>
  )
}


function CourtAbstract({bookingInfo}){
  const courtName = bookingInfo.courtName;
  const stadiumName = bookingInfo.stadiumName;
  const courtNumber = bookingInfo.courtNumber;

  return(
    <div className="flex flex-col w-[418px] border-2 border-silver rounded-3xl">
      <img className="rounded-3xl" src="../src/assets/image/新生籃球場.jpg"></img>
      <div className="flex flex-col text-xl font-semibold my-5 mx-6">
        <p className="">{stadiumName}</p>
        <p className="text-dark-gray">{courtName}</p>
      </div>
    </div>
  )
}

function BookingInfo({bookingInfo}){
  const date = bookingInfo.date;
  const startTime = bookingInfo.startTime;
  const endTime = bookingInfo.endTime;
  const navigate = useNavigate();

  function InfoRow({title, Info}){
    return(
      <div className="h-full flex flex-row items-end gap-14 font-robotoMono">
        <p className="font-semibold">{title}</p>
        <p className="">{Info}</p>
        <button 
        onClick={()=> navigate(-1)}
        className="font-semibold underline underline-offset-2 ms-auto">
          更改
        </button>
      </div>
    )
  }

  return(
    <div className="flex flex-col gap-5">
      <p className="text-xl font-semibold">預約時間資訊</p>
      <InfoRow title="日期" Info={date}/>
      <InfoRow title="時段" Info={`${startTime} ~ ${endTime}`}/>
    </div>
  )
}

function LogInBlock(){
  const { email, setEmail, password, setPassword } = useContext(JoinContext);
  const {isModalOpen, setIsModalOpen} = useContext(JoinContext);
  const handleContinue = () => {
    if (email === ""){
      return;
    }
    
    setIsModalOpen(true);
  }

  // 更動 email 的 state
  const handleChanges = (e) => {
    setEmail(e.target.value);
  }

  return(
    <div className="flex flex-col">
      <p className="text-xl font-semibold mb-6">登入以預約</p>
      <div className="flex flex-col gap-6">
        <input type="text" placeholder="電子郵件" className="h-8 w-full border-gray border-1 rounded-lg ps-3 font-robotoMono" value={email} onChange={handleChanges}/>
        <button className="h-10 w-full text-white font-semibold bg-primary rounded-full hover:bg-black duration-300" onClick={handleContinue}>
          繼續
        </button>
      </div>
    </div>
  )
}

function BookingConfirmPage(){
  const {selectedDayCode} = useContext(JoinContext);

  // 從 local storage 取得 bookingInfo
  let bookingInfo = JSON.parse(window.localStorage.getItem("Stadium-bookingInfo"));
  bookingInfo[selectedDayCode] = selectedDayCode;
  bookingInfo["stadiumName"] = window.localStorage.getItem("Stadium-selected-stadiumName");

  return(
    <div className="container mx-auto">
      <div className="relative px-24  w-full max-w-[1280px] mx-auto mt-4 mb-10 flex flex-col">
        <div className="flex flex-row justify-center items-center">
          <div className="absolute left-0">
            <BackButton linkMode={false}/>
          </div>
          <div className="w-full h-28 py-8 border-b-2 border-silver">
            <div className="h-full flex flex-row items-center justify-between">
              <h1 className="text-2xl font-semibold text-black"> 預約球場 </h1>
            </div>
          </div>
        </div>
        <div className="h-[352px] flex flex-row items-start mt-14">
          <div className="w-3/5 h-full flex flex-col justify-between pe-20">
            <BookingInfo bookingInfo={bookingInfo}/>
            <div className="border-t-2 border-silver"></div>
            <LogInBlock/>
          </div>
          <div className="w-2/5 flex justify-end">
            <CourtAbstract bookingInfo={bookingInfo}/>
          </div>
        </div>
      </div>
      <Modal width="29rem" height="18rem" title="登入" 
        showClose={true} 
        showDivide={false} 
        children={<LogInModal/>}
      />
    </div>
  )
}

export default BookingConfirmPage
