import { useState, useContext, useEffect } from "react"
import {useSearchParams, useNavigate} from "react-router-dom"
import FeatherIcon from "feather-icons-react";
import SiteInfoCard from "../components/cards/SiteInfoCard"
import BackButton from "../components/buttons/BackButton"
import SelectDateButton from "../components/buttons/SelectDateButton"
import CourtCard from "../components/cards/CourtCard";
import { fetchData, postData } from "../utilities/api";
import { useMap, MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import marker from "../assets/map-pin.svg"

import Modal from "../components/modals/Modal"
import JoinContext from "../contexts/JoinContext"
import {dummyJson, dummyJson4BookingDetail} from "../dummyJson/bookingDummy"

// 對資料進行處理
// const jsonData = dummyJson4BookingDetail[2];
// const stadiumName = jsonData.stadiumName;
// const stadiumInfo = jsonData.stadiumInfo;
// const stadiumInfoPreview = jsonData.stadiumInfo.slice(0, 4);
// const staiumPosition = jsonData.stadiumPosition;
// const courtInfo = jsonData.courtInfo;
// const courtNum = jsonData.courtInfo.length;

function BookingDetailPage(){
  const [stadiumData, setStadiumData] = useState(null);
  const [stadiumName, setStadiumName] = useState("");
  const [stadiumInfo, setStadiumInfo] = useState([]);
  const [stadiumInfoPreview, setStadiumInfoPreview] = useState([]);
  const [staiumPosition, setStadiumPosition] = useState([]);
  const [courtInfo, setCourtInfo] = useState([]);
  const [courtNum, setCourtNum] = useState(0);

  const { selectedSport } = useContext(JoinContext);
  // 用來取得 url 中的參數
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams.get("id"))

  const getStadiumData = async () => {
    const response = await fetchData(`stadiums/stadium/${searchParams.get("id")}`);
    const data = response.data.stadium;
    setStadiumData(data);

    console.log(data);
    setStadiumName(data.name);
    setStadiumInfo(data.description);
    setStadiumPosition([parseFloat(data.latitude), parseInt(data.longitude)]);
  }

  useEffect(() => {
    window.localStorage.setItem("Stadium-selected-stadiumName", stadiumName);
    getStadiumData();
  }, [])

  // const response = await fetchData(`stadiums/stadiums`);
  // let stadiumData = response.data.stadiums;
  // const response = await fetchData(`booking/${stadium.id}/date/${year}-${month}-${day}`)
  //     const data = response.data;
  //     if (data.has(stadium.id)) {
  //       const bookingList = data.get(stadium.id);
  //       for (booking of bookingList) {
  //         const startTime = booking.start_time + ":00";
  //         const endTime = booking.end_time + ":00";
  //     }
  //   }


  return(
    <div className="container mx-auto px-24 ">
      {stadiumName &&
        <>
          <div className="relative w-full max-w-[1280px] mx-auto mt-4 mb-10 flex flex-col">
            <div className="flex flex-row justify-center items-center">
              <div className="absolute -left-24">
                <BackButton linkMode={true} linkTo={`/booking/${selectedSport}`}/>
              </div>
              <div className="w-full h-28 py-8 border-b-2 border-silver">
                <div className="w-3/5 pe-16 h-full flex flex-row items-center justify-between">
                  <div className="flex flex-col">
                    <h1 className="text-2xl font-semibold text-black">{stadiumData.name}</h1>
                    <div className="flex flex-row gap-6 text-xl font-semibold text-dark-gray">
                      <h2 >室外</h2>
                      <h2>{courtNum} 個球場</h2>
                    </div>
                  </div>
                  <SelectDateButton/>
                </div>
              </div>
            </div>
            <div className="w-full mt-14 flex flex-row">
              <div className="h-full w-3/5 me-20 flex flex-col gap-6">
                {
                  courtInfo.map((court, index) => (
                    <CourtCard key={index} court={court}/>
                  ))
                }
              </div>
              <div className="w-2/5 flex justify-end bottom-0">
                <SiteInfoCard previewData={stadiumData.description.slice(0, 4)}/>
              </div>
            </div>
            <div className="w-full h-[600px] flex flex-col mt-16 mb-24">
              <p className="text-2xl font-semibold mb-5">球場位置</p>
              <Map stadiumName={stadiumData.name} staiumPosition={staiumPosition}/>
            </div>
          </div>
          <Modal width="50rem" height="32rem" title="基本資訊" showClose={true} children={
          <CourtInfoModal stadiumInfo={stadiumInfo}/>
          }/>
        </>
      }
    </div>
  )
}


function InfoRow({icon, content, additionalClass}){
  return(
    <div className={`w-full flex flex-row items-center ${additionalClass} py-7`}>
      <div className="mr-8 text-dark-gray">
        <FeatherIcon icon={icon} width="28" height="28" strokeWidth="2"/>
      </div>
      <div>
        <p className="font-light">{content}</p>
      </div> 
    </div>
  )
}


// Modal 設定
function CourtInfoModal(props){
  const stadiumInfo = props.stadiumInfo || [];
  return(
    <div className="flex flex-col w-full overflow-auto divide-y-2 divide-silver">
      {
        stadiumInfo.map((info, index) => (
          <InfoRow key={index} icon={info.icon} content={info.content}/>
        ))
      }
      <InfoRow icon={''} content="" additionalClass={"invisible"}/>
    </div>
  )
}


function Map(props){
  const stadiumName = props.stadiumName || "";
  const staiumPosition = props.staiumPosition || [0, 0];
  const newicon = new L.icon({
    iconUrl: marker,
    iconSize: [42, 42],
  });

  return (
    <MapContainer className="h-full z-10" center={staiumPosition} zoom={50}scrollWheelZoom={false}>
      <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker 
      position={staiumPosition}
      icon={newicon}
      >
        <Popup>
          {stadiumName}
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default BookingDetailPage
