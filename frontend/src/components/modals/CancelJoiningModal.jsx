import { useState, useContext, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { deleteAuthData, deleteData } from "../../utilities/api"
import AllContext from "../../contexts/AllContext"
import toast from "react-hot-toast"


function CancelJoiningModal(props){
  const dateCodeTable = JSON.parse(window.localStorage.getItem("Stadium-dateCodeTable"))
  const parentDataList = props.dataList || [];
  const { isModalOpen, setIsModalOpen } = useContext(AllContext);
  const { selectedJoinId, selectedDayCode } = useContext(AllContext);
  const [ data, setData ] = useState();
  const token = window.localStorage.getItem("Stadium-player-token");
  // console.log(parentDataList);

  useEffect(() => {
    setData(parentDataList.find(item => item.id === selectedJoinId));
  }, [selectedJoinId])

  // 查看預約記錄
  const navigate = useNavigate();
  const handleConfirm = async() => {
    // console.log(data.activityId);
    const response = await deleteAuthData(`activities/activity/booking/${data.activityId}`, token);
    console.log(response);

    if (response.msg === "Activity left successfully."){
      toast.success("成功取消報名");
      navigate(0);
    }
    else {
      toast.error("取消報名失敗");
    }
    // navigate(0);
    setIsModalOpen(false);
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  }

  if (!data) return null;
  
  return (
    <div className="w-full h-full bg-center flex justify-center items-center">
      <div className={`flex flex-col w-[464px] h-full justify-between`}>
        <div className="h-3/5 flex flex-col justify-center gap-6">
          <InfoRow 
            className="" 
            text1={data.stadium} 
            text2={data.court}  
          />
          <InfoRow 
            className="" 
            text1={dateCodeTable[selectedDayCode]["date"]} 
            // text2={`${data.startHour}:00 ~ ${data.endHour}:00`} additionalClass="font-robotoMono" 
            text2={`${data.startTime} ~ ${data.endTime}`} additionalClass="font-robotoMono"
            />
        </div>
        <Divider />
        <div className="flex flex-row gap-8">
          <Button text="是" bgColor="primary" textColor="white" borderColor="dark-gray" hoverColor="black" onClick={handleConfirm} />
          <Button text="否" bgColor="white" textColor="black" borderColor="black" hoverColor="light-silver" onClick={handleCancel} />
        </div>
      </div>
    </div>
  )
}


function InfoRow({ text1, text2, additionalClass }) {
  return (
    <div className={`flex flex-row items-center font-semibold ${additionalClass}`}>
      <p className="w-2/5">{text1}</p>
      <p className="w-3/5 ps-10">{text2}</p>
    </div>
  )
}

function Divider() {
  return (
    <span className="border-b-2 border-silver mt-6 mb-8"></span>
  )
}

function Button({ text, onClick, bgColor, textColor, borderColor, hoverColor }) {
  return (
    <button className={`h-10 w-full font-medium text-${textColor} bg-${bgColor} border-1 border-${borderColor} rounded-full flex items-center justify-center hover:bg-${hoverColor} transition duration-300`}
      onClick={onClick}>
      {text}
    </button>
  )
}

export default CancelJoiningModal