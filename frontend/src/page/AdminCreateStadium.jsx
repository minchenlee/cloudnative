import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import { postAuthData, postData } from "../utilities/api"
import AllContext from "../contexts/AllContext";
import BackButton from "../components/buttons/BackButton";
import AdminStadiumInfoCard from "../components/cards/AdminStadiumInfoCard";
import FeatherIcon from 'feather-icons-react';
import UseAnimations from "react-useanimations";
import toggle from 'react-useanimations/lib/toggle';
import toast from 'react-hot-toast';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import 'ldrs/mirage'

// 資料 default 值
let stadiumDataDummy = {
  name: "球場名稱",
  isIndoor: true,
  sport: "BASKETBALL",
  time: {
    openTime: "08:00",
    closeTime: "22:00",
  },
  location: {
    address: "場地地址",
    latitude: 0,
    longitude: 0,
  },
  contactInfo: {
    email: "",
    tel: "場地電話",
  },
  imgUrl: "",
  description: [
    { icon: "info", 
      content: "以下皆為範例資訊，請自行按照需求修改" },
    {
      icon: "map-pin",
      content: "新生一、二籃球場位於網球場及新生車道入口旁"
    },
    {
      icon: "sun",
      content: "週一至六提供夜間照明至晚上10點，特殊節假日可能有變動"
    },
    {
      icon: "cloud-rain",
      content: "遇雨或場地濕滑暫停使用"
    },
    {
      icon: "wifi",
      content: "球場範圍內提供免費無線網路服務"
    },
    {
        icon: "coffee",
        content: "球場附近設有飲料販賣機"
    },
    {
        icon: "smile",
        content: "場地維護人員友善，提供協助和資訊服務"
    },
  ]
}



function AdminCreateStadiumPage(){
  const {isLogin, setIsLogin} = useContext(AllContext);
  const [isEditingInfo, setIsEditingInfo] = useState(false); // 紀錄是否正在編輯基本資訊
  const [isEditingCourt, setIsEditingCourt] = useState(false); // 紀錄是否正在編輯球場
  const [stadiumData, setStadiumData] = useState([]); // 儲存球場資料
  const [editedData, setEditedData] = useState([]); // 儲存編輯的資料
  const [images, setImages] = useState([]); // 儲存上傳的圖片
  const [isWaiting, setIsWaiting] = useState(false); // 紀錄是否正在等待後端回應
  const [courtData, setCourtData] = useState([{name: "球場 A", isOpen: true}]); // 球場資料

  // 檢查是否有登入
  const navigate = useNavigate();
  useEffect(() => {
    const token = window.localStorage.getItem("Stadium-vendor-token")
    if (token){
      setIsLogin(true);
    }

    if (!token){
      toast.error("請先登入");
      navigate("/admin/login");
    }
  }, [])
  

  // 給予 description 的每個 item 一個 id，用來處理刪除的動作
  const linkWithID = (data) => {
    return data.map((item) => {
      return {...item, id: Math.random().toString(36).substr(2, 9)}
    })
  }

  // 初次發送 request 來取得 data
  useEffect(()=>{
    // parse query string
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");
    console.log(`send request to get data with id: ${id}`)

    setStadiumData(stadiumDataDummy);
    const newStadiumData = {...stadiumDataDummy, description: linkWithID(stadiumDataDummy.description)};
    setEditedData(newStadiumData);
    setIsEditingInfo(true);
    setIsEditingCourt(true);
    setImages([]);  // 重置 images
  }, [])


  // 當收到 data 時，更新 editedData，重新 call API
  useEffect(()=>{
    // 當還沒有收到 data 時，不執行
    if (stadiumData.length === 0) return;
    const newStadiumData = {...stadiumData, description: linkWithID(stadiumData.description)};
    setEditedData(newStadiumData);
  }, [isEditingInfo])

  
  function Button (props){
    const isEditing = props.isEditing || false;
    const setIsEditing = props.setIsEditing || setIsEditingInfo;
    const onClick = props.onClick || (()=>setIsEditing(!isEditing));
    const text = props.text || "編輯";
    const textColor = props.textColor || "text-primary";
    const color = props.color || "bg-white";
    const hoverColor = props.hoverColor || "bg-silver";

    if (text === "儲存" || text === "編輯"){
      return (
        <button 
        className={`w-40 h-12 flex items-center justify-center ${textColor} font-semibold rounded-full py-1 font-robotoMono ${color} hover:${hoverColor} duration-500`}
        onClick={onClick}
        disabled={isWaiting}
        >
        {isWaiting && text === "儲存" ? <l-mirage size="60" speed="2.5"color="white"></l-mirage> : text}
        </button>
      )
    }

    return(
      <button 
      className={`w-40 h-12 border-1 text-primary font-semibold rounded-full py-1 font-robotoMono ${color} hover:${hoverColor} duration-500`}
      onClick={onClick}
      >
      {text}
      </button>
    )
  }

  // 按下儲存時，將 editedData 傳送給後端
  const sendData = async() => {
    setIsWaiting(true);
    console.log("send data");
    console.log(editedData);
    console.log(images[0]);
    const token = window.localStorage.getItem("Stadium-vendor-token")
    const userId = parseInt(jwtDecode(token).id);
  
    // 透過 Google Map API 將地址轉換成經緯度
    const address = editedData.location.address;
    let latitude;
    let longitude;
    try{
      const geoCode = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&region=tw&language=zh-TW&key=AIzaSyDR2GpqLQ_KsXA1_2WSIcv2EJFOgw5LOdo`,{headers:null});
      latitude = geoCode.data.results[0].geometry.location.lat;
      longitude = geoCode.data.results[0].geometry.location.lng;
    } catch {
      latitude = 0;
      longitude = 0;
    }

    // console.log(geoCode);
    // console.log(geoCode.data.results[0].geometry.location);

    const data = {
      ...editedData,
      img_url: images[0] || "none",
      location: {
        ...editedData.location,
        latitude: latitude,
        longitude: longitude,
      },
      createdById: userId,
    }

    // console.log(courtData);

    try {
      let response = await postAuthData("stadiums/stadium", data, token);
      // console.log(response);
      const stadiumId = response.data.stadium.id;
      // console.log(courtData);
      for (let i = 0; i < courtData.length; i++){
        const court = {
          status: courtData[i].isOpen ? "OPEN" : "CLOSED",
          stadiumId: stadiumId
        }
        response = await postData(`courts/court`, court);
        // console.log(response);
      }

      toast.success("儲存成功");
      setIsEditingInfo(false);
      setIsEditingCourt(false);
      navigate("/admin");
    } catch (error) {
      console.log(error);
      toast.error("請將錯誤訊息截圖，並聯繫客服："  + error.message);
    }


    setTimeout(() => {
      setIsWaiting(false);
    }, 1000);
  }

  // 假裝等待後端回應
  // useEffect(()=>{
  //   if (!isWaiting) return;

  //   setTimeout(()=>{
  //     setIsWaiting(false);
  //     setIsEditingInfo(false);
  //     toast.success("儲存成功");
  //     // navigate("/admin");
  //   }, 1500)
  // }
  // , [isWaiting])


  return(
    <div className="container mx-auto sm:px-24 px-12">
      <div className="relative w-full max-w-[1280px] mt-12 mb-10 flex flex-col">
        <div className="flex flex-row items-center border-b-1 pb-8 mb-8">
          <div className="absolute -left-24">
            <BackButton/>
          </div>
          <h1 className="text-2xl font-semibold ">{stadiumData.name}</h1>
        </div>
        <div className="flex flex-col gap-8">
          <Block 
          name="場地資訊" 
          children={
            <AdminStadiumInfoCard 
            images={images}
            setImages={setImages}
            isEditing={isEditingInfo} 
            editedData={editedData} 
            setEditedData={setEditedData} 
            stadiumData={stadiumData}
            />
          } 
          />
          <Block 
          name="管理球場" 
          children={<CourtToggleBlock isEditing={isEditingCourt} courtData={courtData} setCourtData={setCourtData}/>}
          />
          <div className="w-full justify-center flex flex-row gap-6 border-2 border-silver rounded-2xl py-8 mb-10">
            <Button 
            isEditing={isEditingInfo} 
            setIsEditing={setIsEditingInfo} 
            onClick={sendData}
            text="儲存" 
            textColor="text-white"
            color="bg-primary" 
            hoverColor="bg-black"/>
            <Button 
            isEditing={isEditingInfo} 
            setIsEditing={setIsEditingInfo} 
            onClick={()=>navigate("/admin")}
            text="取消" 
            color="bg-white" 
            hoverColor="bg-silver"/>
        </div>
        </div>
      </div>
      <div className="hover:bg-green hover:bg-red-400 text-white invisible"/>
    </div>
  )
}


function Block({name, subTitle, children}){
  return(
  <div className="flex flex-col border-2 border-silver rounded-3xl py-6">
    <div className="flex sm:flex-row sm:gap-y-0 flex-col gap-y-2 items-center border-b pb-4 px-6">
      <h1 className="text-2xl sm:text-start text-center font-semibold w-32">{name}</h1>
      {subTitle}
    </div>
    <div className="px-6">
      {children}
    </div>
  </div>
  )
}


function CourtToggleBlock(props){
  const isEditing = props.isEditing || false;
  const courtData = props.courtData || [];
  const setCourtData = props.setCourtData || null;
  
  // 移除球場
  const removeCourt = (courtName) => {
    setCourtData(courtData => courtData.filter(court => court.name !== courtName));
  }

  // 控制球場開放狀態的 toggle card
  function CourtToggle({name, id, courtNum}){
    const isLastCourt = (id === courtNum - 1) && (courtNum !== 1);
    const [isOpen, setIsOpen] = useState(true);
    // const handleClick = () => {
    //   setCourtData(courtData => courtData.map((court) => {
    //     if (court.name === name){
    //       return {...court, isOpen: !court.isOpen}
    //     }
    //     return court;
    //   }))
    // }
    

    // create toggle button
    function ToggleButton(){
      return(
        <div className={`relative w-12 h-8 rounded-full border-4 flex items-center px-1 cursor-pointer`} onClick={()=>setIsOpen(!isOpen)}>
          <div className={`absolute w-4 h-4 rounded-full border-4 transition-transform duration-500 ${isOpen ? "translate-x-full" : ""}`}/>
        </div>
      )
    }

    if (isLastCourt){
      return(
        <div className={`relative flex sm:flex-row sm:gap-y-0 flex-col py-6 gap-y-2 items-center justify-between px-6 h-[82px] w-[291px] border-1 rounded-3xl shadow-[2px_4px_4px_1px_rgba(0,0,0,0.1)] ${isOpen ? 'bg-white text-primary' : 'bg-light-silver text-gray'} duration-500 transition-colors group`}>
          <div className={`status-dot absolute top-3 right-3 w-3 h-3 rounded-full bg-light-green border-1 ${isOpen ? "opacity-100":"opacity-0"} duration-500`}/>
            <p className="text-xl font-semibold">{name}</p>
            <p className="opacity-100 group-hover:opacity-0 duration-500"> 
              {isOpen ? "球場開放中" : "球場關閉中"}
            </p>
            <button 
              className="absolute w-24 h-10 flex items-center justify-center top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 opacity-0 duration-500 group-hover:opacity-100  hover:bg-silver rounded-full" 
              onClick={() => removeCourt(name)}
            >
              <p className="text-xl font-semibold">刪除</p>
              <FeatherIcon icon="trash" width="24" height="24" strokeWidth="3" className="ms-2"/>
            </button>
          <ToggleButton/>
        </div>
      )
    }

    return (
      <div className={`relative flex sm:flex-row sm:gap-y-0 flex-col py-6 gap-y-2 items-center justify-between px-6 h-[82px] w-[291px] border-1 rounded-3xl shadow-[2px_4px_4px_1px_rgba(0,0,0,0.1)] ${isOpen ? 'bg-white text-primary' : 'bg-light-silver text-gray'} duration-500 transition-colors group`}>
        <div className={`status-dot absolute top-3 right-3 w-3 h-3 rounded-full bg-light-green border-1 ${isOpen ? "opacity-100":"opacity-0"} duration-500`}/>
          <p className="text-xl font-semibold">{name}</p>
          <p> 
            {isOpen ? "球場開放中" : "球場關閉中"}
          </p>
        <ToggleButton/>
      </div>
    )
  }

  function AddNewCourt(){
    const addNewCourt = () => {
      const number = courtData.length + 1;
      const code = String.fromCharCode(64 + number);
      setCourtData(courtData => [...courtData, {name: `球場 ${code}`, isOpen: true}]);
    }
    
    return(
      <button 
      className={`relative flex flex-row items-center justify-center px-6 h-[82px] w-[291px] border-1 rounded-3xl bg-white text-gray shadow-[2px_4px_4px_1px_rgba(0,0,0,0.1)]`}
      onClick={()=>addNewCourt()}
      >
        <p className="text-xl font-semibold">新增球場</p>
        <FeatherIcon icon="plus-circle" width="36" height="36" strokeWidth="3" className="ms-2"/>
      </button>
    )
  }

  if (isEditing){
    return(
      <div className="lg:justify-normal justify-center xl:px-6 py-6 lg:px-16 flex flex-wrap gap-y-6 xl:gap-x-14 lg:gap-x-14">
        {courtData.map((court, index) => (
          <CourtToggle key={index} id={index} name={court.name} isOpen={court.isOpen} courtNum={courtData.length}/>
        ))}
        <AddNewCourt/>
      </div>
    )
  }

  return(
    courtData &&
    <div className="lg:justify-normal justify-center xl:px-6 py-6 lg:px-16 flex flex-wrap gap-y-6 xl:gap-x-14 lg:gap-x-14">
      {courtData.map((court, index) => (
        <CourtToggle key={index} name={court.name} isOpen={court.isOpen}/>
      ))}
    </div>
  )
}





export default AdminCreateStadiumPage;