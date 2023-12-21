import { useState, useEffect, useContext } from "react"
import AllContext from "../contexts/AllContext"
import BackButton from "../components/buttons/BackButton"
import BookingCourtCard from "../components/cards/BookingCourtCard"
import TimeIntervalDirection from "../components/directions/TimeIntervalDirection"
import separateItemsByTime from "../utilities/seperateByTime"
import JoiningCard  from '../components/cards/JoiningCard '
import Modal from "../components/modals/Modal"
import { fetchData, fetchAuthData } from "../utilities/api"
import { useNavigate } from 'react-router-dom'
import FeatherIcon from "feather-icons-react/build/FeatherIcon"

import CancelJoiningModal from "../components/modals/CancelJoiningModal"
import CancelBookingModal from "../components/modals/CancelBookingModal"
import FindMateModal from "../components/modals/FindMateModal"
import DetailModal from "../components/modals/DetailModal"

import 'ldrs/ring2'
import { jwtDecode } from "jwt-decode"
// dummy data
const rawJsonData = [
  {
    "id": 1,
    "stadium": "新生籃球場",
    "court": "球場 A",
    "date": "12/04",
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
    "date": "12/04",
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
    "date": "12/05",
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
    "date": "12/05",
    "startTime": "05:00",
    "endTime": "06:00",
    "master": "Janson",
    "member": "William, Mia, Olivia",
    "alreadyRecruitNumber": 4,
    "recruitNumber": 9,
    "contact": "0912345678",
    "note": "不要忘記休息和熱身運動！"
  }
]

function RecordsPage() {
  const [bookingDataList, setBookingDataList] = useState([]);
  const [recuritDataList, setRecuritDataList] = useState([]);
  const [joiningDataList, setJoiningDataList] = useState([]);
  const [modalCategory, setModalCategory] = useState('');

  // 詳細資訊 modal
  const { isModalOpen, setIsModalOpen, selectedJoinId, setSelectedJoinId } = useContext(AllContext);

  // 透過 modalCategory 來決定要顯示哪個 modal
  const modalAuto = () => {
    if (modalCategory === '招募球友') {
      return <FindMateModal recuritDataList={recuritDataList}/>
    }

    if (modalCategory === '詳細資訊') {
      return <DetailModal />
    }

    if (modalCategory === '取消預約') {
      return <CancelBookingModal dataList={bookingDataList}/>
    }

    if (modalCategory === '取消報名') {
      return <CancelJoiningModal dataList={joiningDataList}/>
    }
  }

  // 透過 modalCategory 來決定要顯示哪個 modal 的 title
  const modalTitleAuto = () => {
    if (modalCategory === '招募球友') {
      return '招募球友'
    }

    if (modalCategory === '詳細資訊') {
      return '詳細資訊'
    }

    if (modalCategory === '取消預約') {
      return '取消預約'
    }

    if (modalCategory === '取消報名') {
      return '取消報名'
    }
  }

  return (
    <div className="container mx-auto">
      <div className="relative px-24  w-full max-w-[1280px] mx-auto mt-4 mb-10 flex flex-col">
        <RecordBlock 
          title="預約球場" 
          showBackButton={true}
          children={
            rawJsonData.length === 0 ?
            <div className="mt-10">
              <p className="text-xl font-semibold">還沒有預訂任何球場</p>
            </div>
            :
            <RecordList
              type="booked" 
              setModalCategory={setModalCategory} 
              groupJsonData={rawJsonData}
              recuritDataList={recuritDataList}
              setRecuritDataList={setRecuritDataList}
              bookingDataList={bookingDataList}
              setBookingDataList={setBookingDataList}
            />
          }
        />
        <RecordBlock
          title="已報名的球局"
          showBackButton={false}
          children={
            rawJsonData.length === 0 ?
            <div className="mt-10">
              <p className="text-xl font-semibold">還沒有報名任何球局</p>
            </div>
            :
            <RecordList
              type="joined" 
              setModalCategory={setModalCategory} 
              groupJsonData={rawJsonData}
              joiningDataList={joiningDataList}
              setJoiningDataList={setJoiningDataList}
            />
          }
        />
      </div>
      <Modal 
        width={modalCategory.includes('取消') ? "29rem" : "38.75rem"}
        height={modalCategory.includes('取消') ? "18rem" : "23rem"}
        title={modalTitleAuto()}
        showClose={modalCategory.includes('取消') ? false : true}
        children={modalAuto()} 
      />
    </div>
  )
}


function RecordBlock({ title, children, showBackButton}) {
  return (
    <>
      <div className="flex flex-row justify-center items-center">
        {showBackButton &&
          <div className="absolute left-0">
            <BackButton linkMode={true} linkTo="/findmate" />
          </div>
        }
        <div className="w-full h-28 flex flex-row items-center py-8 border-b-2 border-silver">
          <div className="w-1/3">
            <h1 className="text-2xl font-semibold text-black">{title}</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 mb-20">
        {children}
      </div>
    </>
  )
}

function RecordList({type, setModalCategory, recuritDataList, setRecuritDataList, 
  bookingDataList, setBookingDataList,
  joiningDataList, setJoiningDataList,
}) {
  const { selectedJoinId, selectedDayCode } = useContext(AllContext);
  const [isWaiting, setIsWaiting] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [joiningData, setJoiningData] = useState([]);
  const token = window.localStorage.getItem("Stadium-player-token");

  // useEffect(() => {
  //   console.log(recuritDataList)
  // }, [recuritDataList])

  // 初次進入頁面時，call API 取得 booking 資料
  const getBookingData = async () => {
    setIsWaiting(true);
    const response = await fetchAuthData(`bookings/user`, token);
    const bookingDataList = response.data.bookings;
    // console.log(dataList)

    // 取得 activity 資訊
    const activityResponse = await fetchAuthData(`activities/user`, token);
    const activityDataList = activityResponse.data.activities;
    // console.log(activityDataList)

    let formattedDataList = [];
    for (const bookingData of bookingDataList) {
      // const response = await fetchData(`courts/courts/stadium/${bookingData.court}`);
      // 取得球場資訊
      let response = await fetchData(`stadiums/stadium/${bookingData.stadiumId}`);
      const stadiumData = response.data.stadium;
      const stadiumName = stadiumData.name;

      // 取得 court 資訊
      response = await fetchData(`courts/courts/stadium/${bookingData.stadiumId}`);
      const courtDataList = response.data.courts;
      // 找出預定的 court 球場是 stadium 中的第幾個
      const courtIndex = courtDataList.findIndex((court) => court.id === bookingData.courtId);
      const courtName = `球場 ${String.fromCharCode(65 + courtIndex)}`;
      
      // 找出和 bookingId 相同的 activity 資訊
      let maker = null;
      let capacity = null;
      let participantList = []
      let note = null;
      let contact = null;

      for (let activityData of activityDataList) {
        // 如果 maker id 和 user id 相同，就把 activity id 加到 recuritDataList 裡面
        if (activityData.makerId === jwtDecode(token).id){
          activityData.courtName = courtName;
          setRecuritDataList((prev) => [...prev, activityData]);
        }

        if (activityData.id === bookingData.id) {
          maker = activityData.maker;
          capacity = activityData.capacity;
          participantList = activityData.participants;
          note = activityData.note;
          contact = activityData.contact;
        }
      }


      // 把 bookingData 轉成前端需要的格式
      formattedDataList.push({
        "date": bookingData.date.slice(5).split("T")[0].replace("-", "/"),
        "startTime": bookingData.startHour + ":00",
        "endTime": bookingData.endHour + ":00",
        "stadium": stadiumName,
        "court": courtName,
        "master": maker,
        "alreadyRecruitNumber": participantList.length,
        "recruitNumber": capacity,
        "contact": contact,
        "note": note,
        "member": participantList,
        "id": bookingData.id
      })
    }

    setBookingData(formattedDataList);
    setBookingDataList(formattedDataList);
    setIsWaiting(false);
  }

  // 初次進入頁面時，call API 取得 joining 資料
  const getJoiningData = async () => {
    setIsWaiting(true);
    const response = await fetchAuthData(`activities/user`, token);
    const dataList = response.data.activities;
    // console.log(dataList)

    // 留下 user 不是 maker 的 activity
    const filteredDataList = dataList.filter(data => data.makerId !== jwtDecode(token).id);

    let formattedDataList = [];
    for (const data of filteredDataList) {
      // 取得球場資訊
      let response = await fetchData(`stadiums/stadium/${data.stadiumId}`);
      const stadiumData = response.data.stadium;
      const stadiumName = stadiumData.name;

      // 取得 court 資訊
      response = await fetchData(`courts/courts/stadium/${data.stadiumId}`);
      const courtDataList = response.data.courts;
      // console.log(courtDataList)
      // 找出預定的 court 球場是 stadium 中的第幾個
      const courtIndex = courtDataList.findIndex((court) => court.id === data.court);
      const courtName = `球場 ${String.fromCharCode(65 + courtIndex)}`;

      // 如果 maker id 和 user id 相同，就把 activity id 加到 recuritDataList 裡面
      if (data.makerId === jwtDecode(token).id){
        data.courtName = courtName;
        setRecuritDataList((prev) => [...prev, data]);
      }

      // 把 joiningData 轉成前端需要的格式
      formattedDataList.push({
        "activityId": data.activityId,
        "date": data.date.slice(5).split("T")[0].replace("-", "/"),
        "startTime": data.startHour + ":00",
        "endTime": data.endHour + ":00",
        "stadium": stadiumName,
        "court": courtName,
        "master": data.maker,
        "alreadyRecruitNumber": data.participants.length,
        "recruitNumber": data.capacity,
        "contact": data.contact,
        "note": data.note,
        "member": data.participants,
        "id": data.id
      })
    }

    // console.log(formattedDataList)
    setJoiningData(formattedDataList);
    setJoiningDataList(formattedDataList);
    setIsWaiting(false);
  }

  // 初始化，call API
  useEffect(() => {  
    if (type === "booked") {
      getBookingData();
    }

    if (type === "joined") {
      getJoiningData();
    }
  }, [])

  if (isWaiting) {
    return (
      <div className="w-full flex items-center justify-center mt-20">
        <div className="scale-125">
          <l-mirage
          size="75"
          speed="2.5"
          color="black"
          />
        </div>
      </div>
    )
  }

  if (type === "booked") {
    return (
      bookingData.length === 0 
      ?
      <div className="mt-4 h-24">
        <p className="text-xl font-semibold">還沒有預訂任何球場</p>
      </div>
      :
      <div className="w-full flex flex-col mt-10 gap-4">
        {bookingData.map((item, index) => (
          <BookingCourtCard
          setModalCategory={setModalCategory} 
          key={index} 
          id={item.id} 
          stadium={item.stadium} 
          court={item.court} 
          date={item.date}
          startTime={item.startTime} 
          endTime={item.endTime} 
          master={item.master} 
          alreadyRecruitNumber={item.alreadyRecruitNumber} 
          recruitNumber={item.recruitNumber} 
          />
        ))}
      </div>

    )
  }

  if (type === "joined") {
    return (
      joiningData.length === 0 ?
      <div className="mt-4 h-24">
        <p className="text-xl font-semibold">還沒有加入任何球局</p>
      </div>
      :
      <div className="w-full flex flex-col mt-10 gap-4">
        {joiningData.map((item, index) => (
          <JoiningCard 
          setModalCategory={setModalCategory} 
          key={index} 
          id={item.id} 
          stadium={item.stadium} 
          court={item.court} 
          date={item.date}
          startTime={item.startTime} 
          endTime={item.endTime} 
          master={item.master} 
          alreadyRecruitNumber={item.alreadyRecruitNumber} 
          recruitNumber={item.recruitNumber} 
          />
        ))}
      </div>
    )
  }
}

export default RecordsPage;
