import { useState, useContext, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { fetchAuthData, postData, putAuthData } from "../../utilities/api"
import AllContext from "../../contexts/AllContext"
import FeatherIcon from "feather-icons-react/build/FeatherIcon"
import { jwtDecode } from "jwt-decode"
import toast from "react-hot-toast"


function FindMateModal(props) {
  const navigate = useNavigate();
  const { isModalOpen, setIsModalOpen, selectedJoinId, setSelectedJoinId } = useContext(AllContext);
  const [isWaiting, setIsWaiting] = useState(false);
  const [isMinusDisabled, setIsMinusDisabled] = useState(false);
  const recuritDataList = props.recuritDataList;
  const [recruitData, setRecruitData] = useState();
  const [recruitNumber, setRecruitNumber] = useState(1);
  const [recruitNote, setRecruitNote] = useState("");

  useEffect(() => {
    const targetRecruitData = recuritDataList.find(data => data.id === selectedJoinId);
    setRecruitData(targetRecruitData);
  }, [selectedJoinId])

  useEffect(() => {
    // console.log(recuritData);
    if (recruitData) {
      setRecruitNumber(recruitData.capacity);
      setRecruitNote(recruitData.note);
    }

    if (!recruitData) {
      setRecruitNumber(1);
      setRecruitNote("");
    }
  }, [recruitData])

  // 取得 token
  const token = window.localStorage.getItem("Stadium-player-token");

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

  const handleSubmmit = async() => {
    // console.log("招募人數：", recruitNumber);
    // console.log("附註：", recruitNote);
    setIsWaiting(true);
    const  bookingId = selectedJoinId;
    const data = {
      userId: jwtDecode(token).id,
      note: recruitNote,
      capacity: recruitNumber,
    }
    // 未發布過招募的情形，新增招募
    if (!recruitData){
      const response = await postData(`activities/${bookingId}`, data, );
      if (response.msg === "Activity created successfully.") {
        toast.success("發佈招募成功！");
        setTimeout(() => {
          setIsModalOpen(false);
          navigate(0)
        }, 1200);

      } else {
        toast.error("發佈招募失敗！");
        setTimeout(() => {
          setIsWaiting(false);
          setIsModalOpen(false);
        }, 1200);
      }
    }

    // 已經發布過招募的情形，更新招募
    if (recruitData){
      const response = await putAuthData(`activities/activity/${bookingId}`, data, token);
      if (response.msg === "Activity updated successfully.") {
        toast.success("更新招募成功！");
        setTimeout(() => {
          setIsModalOpen(false);
          navigate('/records')
        }, 1200);

      } else {
        toast.error("更新招募失敗！");
        setTimeout(() => {
          setIsWaiting(false);
          setIsModalOpen(false);
        }, 1200);
      }
    }
  }

  let buttonText = "發佈招募";
  if (recruitNote || recruitNumber > 0) {
    buttonText = "更新招募";
  }

  return (
    <div className="flex flex-col w-full h-full gap-4">
      <div className="flex flex-row items-center gap-5">
        <p className="text-base font-semibold">招募人數：</p>
        <div className="flex flex-row items-center font-robotoMono gap-4">
          <NumButton
            icon="minus"
            onClick={() => setRecruitNumber(recruitNumber - 1)}
            isMinusDisabled={isMinusDisabled}
            onMouseDown={mouseDown2}
            bgColor="white" textColor="primary" borderColor="primary" hoverColor="light-silver" />
          <p className="font-bold text-xl w-8 text-center">{recruitNumber}</p>
          <NumButton
            icon="plus"
            onClick={() => setRecruitNumber(recruitNumber + 1)}
            onMouseDown={mouseDown}
            bgColor="primary" textColor="white" borderColor="primary" hoverColor="light-silver" />
        </div>
      </div>
      <div className="flex flex-col h-3/5">
        <p className="text-base font-semibold mb-4">附註：</p>
        <textarea
          onChange={e => setRecruitNote(e.target.value)}
          className="w-full h-full border-2 border-silver rounded-2xl px-2 pt-1 resize-none bg-opacity-0"
          value={recruitNote}
        />
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
          <p>{buttonText}</p>}
      </button>
    </div>
  )
}


function NumButton({ icon, onClick, isMinusDisabled, onMouseDown, bgColor, textColor, borderColor }) {
  return (
    <button
      onClick={onClick}
      onMouseDown={onMouseDown}
      className={`h-6 w-6 border-4 border-${borderColor} bg-${bgColor} rounded-full relative duration-500 ${isMinusDisabled ? "opacity-40 cursor-default" : ""}`}
    >
      <FeatherIcon icon={icon} width="16" height="16" strokeWidth="4" className={`text-${textColor} absolute top-1/2 transform -translate-y-1/2`} />
      <div className="border-primary display-none"></div>
    </button>
  )
}

export default FindMateModal