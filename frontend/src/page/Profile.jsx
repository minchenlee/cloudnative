import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { putAuthData, fetchData } from "../utilities/api"
import BackButton from "../components/buttons/BackButton"
import FeatherIcon from "feather-icons-react/build/FeatherIcon"
import toast from 'react-hot-toast';
import { jwtDecode } from "jwt-decode";
import { set } from "react-hook-form";


const convertTitle2APIcode = (title) => {
  switch(title){
    case "暱稱":
      return "username";
    case "信箱":
      return "email";
    case "手機":
      return "tel";
    case "密碼":
      return "password";
    default:
      return "";
  }
}

// 補足並修改 profile data
const paddingProfileData = (data) => {
  const username = data.username || "";
  const email = data.email || "";
  const tel = data.tel || "";
  const password = ""
  return {
    username: username,
    email: email,
    tel: tel,
    password: password
  }
}

function ProfilePage(){
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isUpdated, setIsUpdated] = useState(false);

  // 取得使用者資料 
  const fetchProfileData = async(userId) => {
    try {
      const response = await fetchData(`users/${userId}`);
      setProfileData(paddingProfileData(response.data.user));
    } catch (error){
      toast.error(error);
    }
  }

  // 初次載入時檢查是否有登入，並取得使用者資料
  useEffect(() => {
    const token = window.localStorage.getItem("Stadium-player-token")
    if (!token){
      toast.error("請先登入");
      navigate("/login");
    }

    // console.log(jwtDecode(token));
    const userId = parseInt(jwtDecode(token).id);
    fetchProfileData(userId);
  }, [])

  // 透過 isUpdated 來決定是否要重新取得使用者資料
  useEffect(() => {
    if (isUpdated){
      const token = window.localStorage.getItem("Stadium-player-token")
      const userId = parseInt(jwtDecode(token).id);
      fetchProfileData(userId);
      setIsUpdated(false);
    }
  }, [isUpdated])

  useEffect(() => {
    console.log(profileData);
  }, [profileData])

  return(
    <div className="container mx-auto px-24 ">
      <div className="relative w-full max-w-[1280px] mx-auto mt-4 mb-10 flex flex-col">
        <div className="flex flex-row justify-center items-center">
          <div className="absolute -left-24">
            {/* <BackButton linkMode={true} linkTo="/booking"/> */}
          </div>
          <div className="w-full h-28 flex flex-row items-center py-8 border-b-2 border-silver">
            <div className="w-1/3">
              <h1 className="text-2xl font-semibold text-black">個人資料</h1>
            </div>
            <div className="w-1/3"/>
          </div>
        </div>
        {profileData &&
          <div className="w-3/5 flex flex-col items-start py-5 gap-3">
            <BasicInfoRow title="暱稱" content={profileData.username} setIsUpdated={setIsUpdated}/>
            <BasicInfoRow title="信箱" content={profileData.email} setIsUpdated={setIsUpdated}/>
            <BasicInfoRow title="手機" content={profileData.tel} setIsUpdated={setIsUpdated}/>
            <BasicInfoRow title="密碼" content={profileData.password} setIsUpdated={setIsUpdated}/>
          </div>
        }
      </div>
    </div>
  )
}


// 基本資訊的 row
function BasicInfoRow(props){
  const title = props.title || "";
  const content = props.content || "";
  const children = props.children || null;
  const setIsUpdated = props.setIsUpdated || null;
  const [editingContent, setEditingContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditingContent(content);
  }, [isEditing])

  const handleSave = async() => {
    const token = window.localStorage.getItem("Stadium-player-token")
    const userId = parseInt(jwtDecode(token).id);
    const data = {
      [convertTitle2APIcode(title)]: editingContent
    }

    try{
      const response = await putAuthData(`users/${userId}`, data, token);
      if (response.data){
        setIsEditing(false);
        setIsUpdated(true);
        toast.success("更新成功");
      }
    } catch (error){
      setIsEditing(false);
      console.log(error);
      toast.error("更新失敗，請稍後再試");
    }
  }

  return(
    <div className="w-full h-16 ps-4 flex flex-row items-center justify-between border-1 rounded-2xl">
      <p className={`w-16 font-robotoMono font-semibold text-base`}>
        {title}
      </p>
      {/* 一般的資訊編輯 */}
      { (isEditing && title !== "手機") &&
        <input 
        value={editingContent} 
        className={`w-80 me-auto px-1 font-robotoMono text-base rounded-md ring-1 ring-primary focus:outline-none`}
        onChange={(e) => setEditingContent(e.target.value)}
        />
      }
      {/* 電話資訊的編輯 */}
      { (isEditing && title === "手機") &&
        <div 
        className= {`w-80 me-auto px-1 ${isEditing ? "visible" : "invisible"}`}>
          <PhoneNumberInput phone={content} setEditingContent={setEditingContent}/>
        </div>
      }
      {/* 暱稱和信箱的非編輯狀態 */}
      { (!isEditing && title !== "密碼" && title !=='手機') && 
        <p className={`w-80 me-auto px-1 font-robotoMono text-base`}>
          {content === "" ? "尚未填寫" : content}
        </p>
      }
      {/* 手機的非編輯狀態 */}
      { (!isEditing && title === "手機") &&
        <p className={`w-80 me-auto px-1 font-robotoMono text-base`}>
          {content === "" ? "尚未填寫" : content.slice(0, 4) + "-" + content.slice(4, 7) + "-" + content.slice(7, 10)}
        </p>
      }
      {/* 密碼的非編輯狀態 */}
      { (!isEditing && title === "密碼") &&
        <p className={`w-80 me-auto px-1 font-robotoMono text-base`}>
          🔒 放心，我們把你的密碼守護的很好！
        </p>
      }
      <button 
      className={`me-4 w-24 h-8 flex justify-center items-center rounded-full border-1 border-primary hover:bg-primary hover:text-white duration-300 transition-all opacity-0 ${isEditing ? "visible opacity-100" : "invisible"}`}
      onClick={() => setIsEditing(!isEditing)}
      >
        取消
      </button>
      { isEditing ?
        <button 
        className="me-4 w-24 h-8 flex justify-center items-center rounded-full text-white bg-primary border-1 border-primary hover:bg-black duration-300"
        onClick={handleSave}
        >
          儲存
        </button>
        :
        <button 
        className="me-4 w-24 h-8 flex justify-center items-center rounded-full border-1 border-primary hover:bg-primary hover:text-white duration-300"
        onClick={() => setIsEditing(!isEditing)}
        >
          編輯
        </button>
      }
    </div>
  )
}


// 手機號碼的 input
function PhoneNumberInput({ phone, setEditingContent}) {
  const [isNum, setIsNum] = useState(true);
  const [firstPart, setFirstPart] = useState("");
  const [secondPart, setSecondPart] = useState("");
  const [thirdPart, setThirdPart] = useState("");

  useEffect(() => {
    setEditingContent("09" + firstPart + secondPart + thirdPart);
  }, [firstPart, secondPart, thirdPart])

  // 用來自動在輸入完一個區塊後，focus 到下一個區塊
  const secondInputRef = useRef(null);
  const thirdInputRef = useRef(null);

  const handleInputChange = (value, setValue, order, nextInputRef) => {
    if (/^[0-9]*$/.test(value)) {
      setIsNum(true);
      if (order === 1 && value.length <= 2) {
        setValue(value);
      }

      // 當區塊已經填滿後，不再接受輸入
      if (order !== 1 && value.length <= 3) {
        setValue(value);
      }

      // 輸入完一個區塊後，focus 到下一個區塊
      if (value.length === (order === 1 ? 2 : 3) && nextInputRef) {
        nextInputRef.current.focus();
      }
      return;
    }
    // 如果輸入的不是數字，則不接受輸入
    setIsNum(false);
  };

  return (
    <div className="relative">
      <form className="w-full flex items-center font-robotoMono space-x-2">
        <span>09</span>
        <InputRow
          order={1}
          value={firstPart}
          setValue={setFirstPart}
          placeholder={phone.slice(2, 4)}
          nextInputRef={secondInputRef}
          handleInputChange={handleInputChange}
        />
        <span>-</span>
        <InputRow
          order={2}
          value={secondPart}
          setValue={setSecondPart}
          placeholder={phone.slice(4, 7)}
          inputRef={secondInputRef}
          nextInputRef={thirdInputRef}
          handleInputChange={handleInputChange}
        />
        <span>-</span>
        <InputRow
          order={3}
          value={thirdPart}
          setValue={setThirdPart}
          placeholder={phone.slice(7, 12)}
          inputRef={thirdInputRef}
          handleInputChange={handleInputChange}
        />
      </form>
      {isNum ? null : (
        <span className="absolute top-8 left-0 bg-white text-red-500 text-sm font-medium">
          請輸入數字
        </span>
      )}
    </div>
  );
}

function InputRow({ order, value, setValue, placeholder, inputRef, nextInputRef, handleInputChange }) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => handleInputChange(e.target.value, setValue, order, nextInputRef)}
      className={`${ order === 1 ? "w-12" : "w-14"} h-7 border-1 border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-silver `}
      placeholder={placeholder}
      ref={inputRef}
    />
  );
}


export default ProfilePage