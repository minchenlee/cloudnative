import { useState, useContext, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import AllContext from "../../contexts/AllContext"

const DetailModal = (props) => {
  const dateCodeTable = JSON.parse(window.localStorage.getItem("Stadium-dateCodeTable"))
  const parentDataList = props.dataList || [];
  const { isModalOpen, setIsModalOpen } = useContext(AllContext);
  const { selectedJoinId, selectedDayCode } = useContext(AllContext);
  const [ data, setData ] = useState();


  const weekData = JSON.parse(window.localStorage.getItem("joinJson"))
  const joinDetailData = JSON.parse(window.localStorage.getItem("joinDetailJson")) || [];
  const [selectedJoinData, setSelectedJoinData] = useState();
  function convertNewlinesToBR(inputString) {
    return inputString.replace(/\n/g, '<br/>');
  }

  // 當 selectedJoinId 改變時，更新 selectedJoinData
  useEffect(() => {
    setData(parentDataList.find(item => item.id === selectedJoinId));
  }, [selectedJoinId])

  useEffect(() => {
    setSelectedJoinData(joinDetailData.find(item => item.id === selectedJoinId));
    console.log(joinDetailData.find(item => item.id === selectedJoinId));
  }, [selectedJoinId])


  function InfoRow({ title, content, additionalClass }) {
    return (
      <div className={`flex flex-row items-start`}>
        <p className="w-1/4 font-medium">{title}</p>
        <p className={`w-3/4 font-robotoMono ${additionalClass}`}>{content}</p>
      </div>
    )
  }

  if (!data) return null;

  return (
    <div className="flex flex-col w-full h-[298px] gap-5 overflow-scroll">
      <InfoRow title="球場" content={data["stadium"]} />
      <InfoRow title="場地" content={data["court"]} />
      <InfoRow title="日期" content={dateCodeTable[selectedDayCode]["date"]} />
      <InfoRow title="時段" content={`${data["startTime"]} ~ ${data["endTime"]}`} />
      <InfoRow title="成員" content={`${data["master"]}, ${data["member"]}`} />
      <InfoRow title="聯絡方式" content={`${data["contact"]}`} />
      <InfoRow title="附註" content={`${data["note"]}`} additionalClass="pe-10 whitespace-pre-line" />
    </div>
  )
}

export default DetailModal