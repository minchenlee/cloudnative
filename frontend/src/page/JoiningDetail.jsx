import { useState, useEffect, useContext } from "react"
import { useLocation } from "react-router-dom";
import BackButton from "../components/buttons/BackButton"
import MateCourtCard from "../components/cards/MateCourtCard"
import TimeIntervalDirection from "../components/directions/TimeIntervalDirection"
import SelectDateButton from "../components/buttons/SelectDateButton"
import separateItemsByTime from "../utilities/seperateByTime"
import Modal from "../components/modals/Modal"
import JoinContext from "../contexts/JoinContext"



// Modal 設定 
function JoiningDetailModal(){
  const weekData = JSON.parse(window.localStorage.getItem("joinJson"))
  const joinDetailData = JSON.parse(window.localStorage.getItem("joinDetailJson"));
  const {selectedJoinId, selectedDayCode} = useContext(JoinContext);
  const [selectedJoinData, setSelectedJoinData] = useState();
  function convertNewlinesToBR(inputString) {
    return inputString.replace(/\n/g, '<br/>');
  }
  
  
  useEffect(() => {
    setSelectedJoinData(joinDetailData.find(item => item.id === selectedJoinId));
  }, [selectedJoinId])

  function InfoRow({title, content, additionalClass}){
    return(
      <div className={`flex flex-row items-start`}>
        <p className="w-1/4 font-medium">{title}</p>
        <p className={`w-3/4 font-robotoMono ${additionalClass}`}>{content}</p>
      </div>
    )
  }

  if (!selectedJoinData) return null;

  return(
    <div className="flex flex-col w-full h-[298px] gap-5 overflow-scroll">
      <InfoRow title="球場" content={selectedJoinData["stadium"]}/>
      <InfoRow title="場地" content={selectedJoinData["court"]}/>
      <InfoRow title="日期" content={weekData[selectedDayCode]["date"]}/>
      <InfoRow title="時段" content={`${selectedJoinData["startTime"]} ~ ${selectedJoinData["endTime"]}`}/>
      <InfoRow title="成員" content={`${selectedJoinData["master"]}, ${selectedJoinData["member"]}`}/>
      <InfoRow title="聯絡方式" content={`${selectedJoinData["contact"]}`}/>
      <InfoRow title="附註" content={`${selectedJoinData["note"]}`} additionalClass="pe-10 whitespace-pre-line"/>
    </div>
  )
}


// api 的觸發是透過 SelectDateButton 來觸發
function JoiningDetailPage(){
  // dummy data
  const rawJsonData = [
    {
      "id": 1,
      "stadium": "新生籃球場",
      "court": "球場 A",
      "startTime": "09:00",
      "endTime": "10:00",
      "master": "Peter",
      "member": "Alice, Karen",
      "alreadyRecruitNumber": 3,
      "recruitNumber": 8,
      "contact": "0912345678",
      "note": "這場比賽將會很激烈，請準備好！\n這句話不僅僅是一句口號，它代表著一場充滿競爭、挑戰和激情的比賽即將展開。\n無論是在體育比賽、商業競爭，還是其他領域，一場激烈的比賽都需要參與者充分準備好，以應對各種可能的情況和挑戰。\n首先，激烈的比賽意味著參與者需要具備優秀的技能和能力。無論是在體育競技中，需要出色的體能和技術，還是在商業競爭中，需要優越的市場洞察力和創新能力，參與者必須在自己的領域中表現出色，才能在激烈的競爭中脫穎而出。\n此外，激烈的比賽也需要參與者具備堅強的意志和心理素質。在比賽中可能會面臨壓力、挫折和困難，只有那些能夠堅持不懈、保持冷靜並迅速適應變化的人才能夠在競爭中取得成功。\n準備好心理上的挑戰同樣重要，這需要訓練和準備。總之，一場激烈的比賽需要參與者在各個方面都做好充分的準備。只有具備優秀的技能、堅強的意志、良好的心理素質、優越的團隊合作和明智的策略，參與者才能夠在這場激烈的競爭中脫穎而出，取得勝利。\n所以，不管是在哪個領域，只要你參加一場激烈的比賽，請確保自己已經做好了充分的準備，因為這場比賽將會是一場激烈的角逐，只有最優秀的人才能夠勝出。"
    },
    {
      "id": 2,
      "stadium": "中央籃球場",
      "court": "球場 B",
      "startTime": "15:00",
      "endTime": "16:00",
      "master": "Janson",
      "member": "John, Emma",
      "alreadyRecruitNumber": 3,
      "recruitNumber": 7,
      "contact": "0912345678",
      "note": "希望大家能享受這場比賽！"
    },
    {
      "id": 3,
      "stadium": "半場籃球場",
      "court": "球場 C",
      "startTime": "10:00",
      "endTime": "11:00",
      "master": "Peter",
      "member": "Liam, Olivia, Sophia",
      "alreadyRecruitNumber": 4,
      "recruitNumber": 6,
      "contact": "0912345678",
      "note": "請記得攜帶水和運動鞋！"
    },
    {
      "id": 4,
      "stadium": "中央籃球場",
      "court": "球場 D",
      "startTime": "05:00",
      "endTime": "06:00",
      "master": "Janson",
      "member": "William, Mia, Olivia",
      "alreadyRecruitNumber": 4,
      "recruitNumber": 9,
      "contact": "0912345678",
      "note": "不要忘記休息和熱身運動！"
    },
    {
      "id": 5,
      "stadium": "半場籃球場",
      "court": "球場 E",
      "startTime": "08:00",
      "endTime": "09:00",
      "master": "Peter",
      "member": "James, Sophia, Ethan, Emma",
      "alreadyRecruitNumber": 5,
      "recruitNumber": 10,
      "contact": "0912345678",
      "note": "讓我們一起打出精彩的比賽！"
    },
    {
      "id": 6,
      "stadium": "新生籃球場",
      "court": "球場 F",
      "startTime": "02:00",
      "endTime": "03:00",
      "master": "Janson",
      "member": "Benjamin, Mia, Ava, Ethan, Daniel",
      "alreadyRecruitNumber": 6,
      "recruitNumber": 7,
      "contact": "0912345678",
      "note": "大家一定會玩得開心！"
    },
    {
      "id": 7,
      "stadium": "中央籃球場",
      "court": "球場 G",
      "startTime": "11:00",
      "endTime": "12:00",
      "master": "Peter",
      "member": "Henry, Emily, William",
      "alreadyRecruitNumber": 4,
      "recruitNumber": 5,
      "contact": "0912345678",
      "note": "請保持運動家精神！"
    },
    {
      "id": 8,
      "stadium": "新生籃球場",
      "court": "球場 H",
      "startTime": "01:00",
      "endTime": "02:00",
      "master": "Janson",
      "member": "Alexander, Charlotte, Amelia",
      "alreadyRecruitNumber": 4,
      "recruitNumber": 7,
      "contact": "0912345678",
      "note": "讓我們一起享受籃球樂趣！"
    },
    {
      "id": 9,
      "stadium": "半場籃球場",
      "court": "球場 I",
      "startTime": "19:00",
      "endTime": "20:00",
      "master": "Peter",
      "member": "Michael, Amelia, Liam",
      "alreadyRecruitNumber": 4,
      "recruitNumber": 8,
      "contact": "0912345678",
      "note": "這將是一場精彩的比賽！"
    },
    {
      "id": 10,
      "stadium": "新生籃球場",
      "court": "球場 J",
      "startTime": "20:00",
      "endTime": "21:00",
      "master": "Janson",
      "member": "Daniel, Harper, Sophia",
      "alreadyRecruitNumber": 4,
      "recruitNumber": 9,
      "contact": "0912345678",
      "note": "期待大家的表現！"
    }
  ]  
  
  const sortedJsonData = separateItemsByTime(rawJsonData);

  useEffect(() => {
    // console.log(jsonData);
    window.localStorage.setItem("joinDetailJson", JSON.stringify(rawJsonData));
  }, [rawJsonData])

  // 每個時間區間的球場資訊
  function TimeIntervalSet({groupJsonData, config}){
    return(
      <div className="w-full flex flex-col mt-10 gap-4">
        <TimeIntervalDirection text={config.text} time={config.time} bg={config.bg} color={config.color}/>
        {groupJsonData.map((item, index) => (
          <MateCourtCard key={index} id={item.id} stadium={item.stadium} startTime={item.startTime} endTime={item.endTime} master={item.master} alreadyRecruitNumber={item.alreadyRecruitNumber} recruitNumber={item.recruitNumber}/>
        ))}

        {/* for helping vite rendering dynamic class, some issue need to do futher research.*/}
        <div className="invisible">
          <span className="bg-light-green"></span>
          <span className="bg-peach"></span>
          <span className="bg-fade-blue"></span>
        </div>
      </div>
    )
  }

  return(
    <div className="container mx-auto">
      <div className="relative px-24  w-full max-w-[1280px] mx-auto mt-4 mb-10 flex flex-col">
        <div className="flex flex-row justify-center items-center">
          <div className="absolute left-0">
            <BackButton linkMode={true} linkTo="/findmate/join"/>
          </div>
          <div className="w-full h-28 flex flex-row items-center py-8 border-b-2 border-silver">
            <div className="w-1/3">
              <h1 className="text-2xl font-semibold text-black">尋找球場報名</h1>
            </div>
            <div className="w-2/3 flex justify-end">
              <SelectDateButton/>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 mb-20">
          <TimeIntervalSet groupJsonData={sortedJsonData["08:00-12:00"]} config={{text:"上午", time:"08:00 ~ 12:00", bg:"light-green", color:"dark-gray"}}/>
          <TimeIntervalSet groupJsonData={sortedJsonData["12:00-18:00"]} config={{text:"下午", time:"12:00 ~ 18:00", bg:"peach", color:"dark-gray"}}/>
          <TimeIntervalSet groupJsonData={sortedJsonData["18:00-22:00"]}config={{text:"晚上", time:"18:00 ~ 22:00", bg:"fade-blue", color:"white"}}/>
        </div>
      </div>
      <Modal width="40rem" title="詳細資訊" showClose={true} children={<JoiningDetailModal/>}/>
    </div>
  )
}

export default JoiningDetailPage
