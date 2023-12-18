import { useState, useContext, useRef, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import JoinContext from "../contexts/JoinContext";
import useOutsideClick from "../utilities/useOutsideClick";
import FeatherIcon from "feather-icons-react/build/FeatherIcon"
import toast from 'react-hot-toast';

function AdminHeader() {
  const {isLogin, setIsLogin} = useContext(JoinContext);
  const navigate = useNavigate();

  // 處理點擊 component 外的事件
  const handleClickOutside = () => {
    setIsOpenAccountMenu(false);
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, handleClickOutside);


  // 處理登出
  const onLogout = () => {
    setIsLogin(false);
    window.localStorage.removeItem("Stadium-vendor-token");
    toast.success("登出成功");
    navigate("/admin/login");
  }

  // 檢查是否有登入
  useEffect(() => {
    const token = window.localStorage.getItem("Stadium-vendor-token")
    if (token){
      setIsLogin(true);
    }
  }, [])

  return (
    <div className='sticky top-0  h-[78px] z-30'>
      <div className='z-0 absolute w-screen h-full bg-black border-solid border-b-2 border-silver'/>
      <div  className='z-20 absolute w-full px-48 pt-9 pb-2 flex flex-row text-yellow-400 '>
        <div className='leading-4'>
            <span className='font-primary font-semibold text-xl'>stadium.</span>
            <span className='font-primary font-semibold text-sm ms-3'>admin</span>
        </div>
        <div className='flex grow justify-end text-sm'>
          {isLogin &&
          <button
            className='font-primary font-semibold flex flex-row justify-center items-center'
            onClick={() => onLogout()}
          >
            登出
          </button>
          }
        </div>
      </div>
    </div>
  )
}

export default AdminHeader
