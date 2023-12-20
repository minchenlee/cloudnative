import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import AllContext from "../contexts/AllContext"
import BackButton from "../components/buttons/BackButton"
import Modal from "../components/modals/Modal"
import LogInModal from "../components/modals/LoginModal"
import { fetchData, postData, postAuthData } from "../utilities/api"
import { jwtDecode } from "jwt-decode";
import { set, useForm } from "react-hook-form"
import toast from 'react-hot-toast';
import 'ldrs/ring2'

function BookingConfirmPage(){
  const {selectedDayCode} = useContext(AllContext);
  const {isLogin, setIsLogin} = useContext(AllContext);

  // 從 local storage 取得 bookingInfo
  let bookingInfo = JSON.parse(window.localStorage.getItem("Stadium-bookingInfo"));
  const dateCodeTable = JSON.parse(window.localStorage.getItem("Stadium-dateCodeTable"));
  bookingInfo["day"] = dateCodeTable[selectedDayCode].day;
  bookingInfo["date"] = dateCodeTable[selectedDayCode].date;
  // bookingInfo["stadiumName"] = window.localStorage.getItem("Stadium-selected-stadiumName");

  return(
    <div className="container mx-auto px-24">
      <div className="relative w-full max-w-[1280px] mx-auto mt-4 mb-10 flex flex-col">
        <div className="flex flex-row justify-center items-center">
          <div className="absolute -left-24">
            <BackButton linkMode={false}/>
          </div>
          <div className="w-full h-28 py-8 border-b-2 border-silver">
            <div className="h-full flex flex-row items-center justify-between">
              <h1 className="text-2xl font-semibold text-black"> 預約球場 </h1>
            </div>
          </div>
        </div>
        <div className="h-[352px] flex flex-row items-start mt-14">
          <div className="w-3/5 h-full flex flex-col pe-20">
            <BookingInfo bookingInfo={bookingInfo}/>
            <div className="border-t-2 border-silver"></div>
            <LogInBlock bookingInfo={bookingInfo} dateCodeTable={dateCodeTable}/>
          </div>
          <div className="w-2/5 flex justify-end">
            <CourtAbstract bookingInfo={bookingInfo}/>
          </div>
        </div>
      </div>
      <Modal width="29rem" height="18rem" title="登入" 
        showClose={true} 
        showDivide={false} 
        children={<LogInModal isForBooking={true}/>}
      />
    </div>
  )
}


function CourtAbstract({bookingInfo}){
  const courtName = bookingInfo.courtName;
  const stadiumName = bookingInfo.stadiumName;

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
  const day = bookingInfo.day;
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
    <div className="flex flex-col gap-5 mb-8">
      <p className="text-xl font-semibold">預約時間資訊</p>
      <InfoRow title="日期" Info={`${date} ${day}`}/>
      <InfoRow title="時段" Info={`${startTime} ~ ${endTime}`}/>
    </div>
  )
}

function LogInBlock(props){
  const bookingInfo = props.bookingInfo;
  const dateCodeTable = props.dateCodeTable;
  const { email, setEmail, password, setPassword } = useContext(AllContext);
  const {isModalOpen, setIsModalOpen} = useContext(AllContext);
  const {isLogin, setIsLogin} = useContext(AllContext);
  const { selectedDayCode } = useContext(AllContext);
  const [isWaiting, setIsWaiting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

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

  // 如果有登入，直接發送預約 request
  const handleBooking = async() => {
    setIsWaiting(true);
    const token = window.localStorage.getItem("Stadium-player-token");

    // 把格式轉換成後端要的格式
    const requestData = {
      courtId: bookingInfo.courtId,
      bookingDate: dateCodeTable[selectedDayCode].fullDate.replaceAll("/", "-"),
      bookingStartHour: parseInt(bookingInfo.startTime.split(":")[0]),
      bookingEndHour: parseInt(bookingInfo.endTime.split(":")[0]),
    }

    // console.log(requestData);
    const response = await postAuthData("bookings/booking", requestData, token);
    if (response.msg === "Booking created successfully."){
      toast.success("預約成功");

      let bookingInfo = JSON.parse(window.localStorage.getItem("Stadium-bookingInfo"));
      const bookingId = response.data.id;
      bookingInfo["bookingId"] = bookingId;
      window.localStorage.setItem("Stadium-bookingInfo", JSON.stringify(bookingInfo));

      setTimeout(() => {
        setIsWaiting(false);
        navigate("/booking/success");
      }, 1200);
    }
    else{
      toast.error("預約失敗");
    }
  }


  if (!isLogin){
    return(
      <div className="flex flex-col mt-4">
        <p className="text-xl font-semibold mb-6">登入以預約</p>
        <form className="flex flex-col" onSubmit={handleSubmit(handleContinue)}>
          <input 
            {...register("email", { 
              required: true, 
            })}
            type="text" 
            placeholder="電子郵件" 
            className="h-8 w-full border-gray border-1 rounded-lg ps-3 font-robotoMono" 
            value={email} 
            onChange={handleChanges}
          />
          {errors.email?.type === "required" && HintMessage({text: "請輸入信箱"})}
          <button 
            className="mt-6 h-10 w-full text-white font-semibold bg-primary rounded-full hover:bg-black duration-300" type="submit"
          >
            繼續
          </button>
        </form>
      </div>
    )
  }

  return(
    <div className="flex flex-col mt-10">
      <div className="flex flex-col gap-6">
        <button className="h-10 w-full flex items-center justify-center text-white font-semibold bg-primary rounded-full hover:bg-black duration-300" onClick={handleBooking}>
          {isWaiting ?
          <l-ring-2
            size="24"
            stroke="5"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.7"
            color="white" 
          />
          :
          <p>確認預約</p>
          }
        </button>
      </div>
    </div>
  )
}


function HintMessage(props){
  const text = props.text || "";
  const textColor = props.textColor || "text-red-600 ";

  return(
    <span className={`${textColor} ms-2 text-sm font-semibold font-robotoMono}`}>
      {text}
    </span>
  )
}

export default BookingConfirmPage
