import { useState, useContext, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import JoinContext from "../../contexts/JoinContext"

function InfoRow({ text1, text2, additionalClass }) {
  return (
    <div className={`flex flex-row items-center text-base font-semibold ${additionalClass}`}>
      <p className="w-2/5">{text1}</p>
      <p className="w-3/5 ps-10">{text2}</p>
    </div>
  )
}

function Divider() {
  return (
    <span className="border-b-2 border-silver"></span>
  )
}

function Button({ text, onClick, bgColor, textColor, borderColor, hoverColor }) {
  return (
    <button className={`h-11 w-full font-medium text-${textColor} bg-${bgColor} border-1 border-${borderColor} rounded-full flex items-center justify-center hover:bg-${hoverColor} transition duration-300`}
      onClick={onClick}>
      {text}
    </button>
  )
}

const CancelModal = () => {
  const weekData = JSON.parse(window.localStorage.getItem("joinJson"))
  const joinDetailData = JSON.parse(window.localStorage.getItem("joinDetailJson")) || [];
  const { selectedJoinId, selectedDayCode } = useContext(JoinContext);
  const [selectedJoinData, setSelectedJoinData] = useState();
  function convertNewlinesToBR(inputString) {
    return inputString.replace(/\n/g, '<br/>');
  }

  useEffect(() => {
    setSelectedJoinData(joinDetailData.find(item => item.id === selectedJoinId));
    console.log('selectedJoinData????', selectedJoinData)
  }, [selectedJoinId])

  // 招募球友
  const { isModalOpen, setIsModalOpen } = useContext(JoinContext);
  const handleFindMate = () => {
    setIsModalOpen(true);
  }

  // 查看預約記錄
  const navigate = useNavigate();
  const handleGoToRecord = () => {
    navigate('/records');
  }

  if (!selectedJoinData) return null;

  return (
    <div className="w-full h-full bg-center flex justify-center items-center">
      <div className={`flex flex-col w-[620px] h-full rounded-3xl pt-6 pb-10 px-16`}>
        <div className={`flex flex-col h-full w-full justify-between pt-4 border-silver`}>
          {/* <div className="flex flex-row items-center gap-4">
            <p className="text-2xl font-semibold">預約完成</p>
            <FeatherIcon icon="check-circle" width="32" height="32" strokeWidth="3" className="text-primary" />
          </div>
          <Divider /> */}
          <div className="h-2/5 flex flex-col justify-center gap-6">
            <InfoRow className="" text1={selectedJoinData["stadium"]} text2={selectedJoinData["court"]}  />
            <InfoRow className="" text1={weekData[selectedDayCode]["date"]} text2={`${selectedJoinData["startTime"]} ~ ${selectedJoinData["endTime"]}`} additionalClass="font-robotoMono" />
          </div>
          <Divider />
          <div className="flex flex-row gap-8">
            <Button text="是" bgColor="primary" textColor="white" borderColor="dark-gray" hoverColor="black" onClick={handleFindMate} />
            <Button text="否" bgColor="white" textColor="black" borderColor="black" hoverColor="light-silver" onClick={handleGoToRecord} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CancelModal