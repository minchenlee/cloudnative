import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import AdminStadiumCard from "../components/cards/AdminStadiumCard";
import AdminCourtCard from "../components/cards/AdminCourtCard";
import FeatherIcon from 'feather-icons-react';
import BackButton from "../components/buttons/BackButton";
import {dummyJson, dummyJson4BookingDetail} from "../dummyJson/bookingDummy"
import AdminCourtRecordCard from "../components/cards/AdminCourtRecord";
import Modal from "../components/modals/Modal";




// Modal 設定 
function CourtModal(){
  // const weekData = JSON.parse(window.localStorage.getItem("joinJson"))
  // const joinDetailData = JSON.parse(window.localStorage.getItem("joinDetailJson"));
  // const {selectedJoinId, selectedDayCode} = useContext(JoinContext);

  // const [selectedCourtData, setsSelectedCourtData] = useState();
  const selectedCourtData = {
    "id": 1,
    "stadium": "新生籃球場",
    "court": "球場 A",
    "date": "2021/10/10",
    "startTime": "09:00",
    "endTime": "10:00",
    "master": "Peter",
    "member": "John, Mary",
    "contact": "0912345678",
    "note": "請準時到場，謝謝！其他事項請私訊我，謝謝！"
  }

  
  // useEffect(() => {
  //   setsSelectedCourtData(joinDetailData.find(item => item.id === selectedJoinId));
  // }, [selectedJoinId])

  function InfoRow({title, content, additionalClass}){
    return(
      <div className={`flex flex-row items-start`}>
        <p className="w-1/4 font-medium">{title}</p>
        <p className={`w-3/4 font-robotoMono ${additionalClass}`}>{content}</p>
      </div>
    )
  }

  if (!selectedCourtData) return null;

  return(
    <div className="flex flex-col w-full h-[298px] gap-5 overflow-scroll">
      <InfoRow title="球場" content={selectedCourtData["stadium"]}/>
      <InfoRow title="場地" content={selectedCourtData["court"]}/>
      {/* <InfoRow title="日期" content={weekData[selectedDayCode]["date"]}/> */}
      <InfoRow title="時段" content={`${selectedCourtData["startTime"]} ~ ${selectedCourtData["endTime"]}`}/>
      <InfoRow title="成員" content={`${selectedCourtData["master"]}, ${selectedCourtData["member"]}`}/>
      <InfoRow title="聯絡方式" content={`${selectedCourtData["contact"]}`}/>
      <InfoRow title="附註" content={`${selectedCourtData["note"]}`} additionalClass="pe-10 whitespace-pre-line"/>
    </div>
  )
}



// 對資料進行處理
const jsonData = dummyJson4BookingDetail[1];
const stadiumName = jsonData.stadiumName;
const stadiumInfo = jsonData.stadiumInfo;
const stadiumInfoPreview = jsonData.stadiumInfo.slice(0, 4);
const staiumPosition = jsonData.stadiumPosition;
const courtInfo = jsonData.courtInfo;
const courtNum = jsonData.courtInfo.length;

function AdminCourtStatusPage(){
  const [isLogin, setIsLogin] = useState(false);


  return(
    <div className="container mx-auto px-24">
      <div className="relative w-full max-w-[1280px] mt-12 flex flex-col">
        <div className="flex flex-row items-center border-b-1 pb-8 mb-8">
          <div className="absolute -left-24">
            <BackButton/>
          </div>
          <h1 className="text-2xl font-semibold ">新生籃球場</h1>
        </div>
        <div className="flex flex-row mb-14">
          <div className="h-full w-7/12 me-12 flex flex-col gap-6">
            {
              courtInfo.map((court, index) => (
                <AdminCourtCard key={index} court={court}/>
              ))
            }
          </div>
          <div className="w-6/12 flex justify-end bottom-0">
            <AdminCourtRecordCard previewData={stadiumInfoPreview}/>
          </div>
        </div>
      </div>
      <Modal width="40rem" title="詳細資訊" showClose={true} children={CourtModal()}/>
    </div>
  )
}


export default AdminCourtStatusPage;