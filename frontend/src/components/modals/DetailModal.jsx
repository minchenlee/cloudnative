import { useState, useContext, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import JoinContext from "../../contexts/JoinContext"

const DetailModal = () => {
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

  useEffect(() => {
    console.log('selectedJoinData????', selectedJoinData)
  }, [selectedJoinData])

  useEffect(() => {
    console.log('joinDetailData????', joinDetailData)
  }, [joinDetailData])

  useEffect(() => {
    console.log('weekData????', weekData)
  }, [weekData])

  function InfoRow({ title, content, additionalClass }) {
    return (
      <div className={`flex flex-row items-start`}>
        <p className="w-1/4 font-medium">{title}</p>
        <p className={`w-3/4 font-robotoMono ${additionalClass}`}>{content}</p>
      </div>
    )
  }

  if (!selectedJoinData) return null;

  return (
    <div className="flex flex-col w-full h-[298px] gap-5 overflow-scroll">
      <InfoRow title="球場" content={selectedJoinData["stadium"]} />
      <InfoRow title="場地" content={selectedJoinData["court"]} />
      <InfoRow title="日期" content={weekData[selectedDayCode]["date"]} />
      <InfoRow title="時段" content={`${selectedJoinData["startTime"]} ~ ${selectedJoinData["endTime"]}`} />
      <InfoRow title="成員" content={`${selectedJoinData["master"]}, ${selectedJoinData["member"]}`} />
      <InfoRow title="聯絡方式" content={`${selectedJoinData["contact"]}`} />
      <InfoRow title="附註" content={`${selectedJoinData["note"]}`} additionalClass="pe-10 whitespace-pre-line" />
    </div>
  )
}

export default DetailModal