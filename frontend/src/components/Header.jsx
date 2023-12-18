import { useState, useRef, useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import JoinContext from "../contexts/JoinContext";
import useOutsideClick from "../utilities/useOutsideClick";
import FeatherIcon from "feather-icons-react/build/FeatherIcon"
import toast from 'react-hot-toast';

function Header() {
  const {isLogin, setIsLogin} = useContext(JoinContext);
  const navigate = useNavigate();
  const [isOpenAccountMenu, setIsOpenAccountMenu] = useState(false);

  // 處理點擊 component 外的事件
  const handleClickOutside = () => {
    setIsOpenAccountMenu(false);
  };

  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, handleClickOutside);


  // 處理登出
  const onLogout = () => {
    setIsLogin(false);
    window.localStorage.removeItem("Stadium-player-token");
    toast.success("登出成功");
    navigate("/booking");
  }

  // 檢查是否有登入
  useEffect(() => {
    const token = window.localStorage.getItem("Stadium-player-token")
    if (token){
      setIsLogin(true);
    }
  }, [])

  return (
    <div className='sticky top-0 h-[78px] z-30'>
      <div className='z-0 absolute w-screen h-full bg-white border-solid border-b-2 border-silver'/>
      <div className='z-20 absolute w-full px-48 pt-9 pb-2 flex flex-row'>
        <p className='font-primary font-semibold text-xl'>stadium.</p>
        <div className='flex grow justify-end space-x-20'>
          <button 
          className='font-primary font-semibold text-base'
          onClick={() => navigate("/booking")}
          >
            預約球場
          </button>
          <button 
          className='font-primary font-semibold text-base'
          onClick={() => navigate("/findmate")}
          >
            找球友
          </button>
          <button 
          className='relative font-primary font-semibold text-xl flex flex-row justify-center items-center gap-2 border-1 border-gray px-2 py-[1px] rounded-full hover:bg-light-silver transition duration-300'
          onClick={() => setIsOpenAccountMenu(!isOpenAccountMenu)}
          >
            <div>
              <i className="bi bi-list"></i>
            </div>
            <div>
              <i className="bi bi-person-circle"></i>
            </div>
            {isLogin &&
              <ul 
              ref={wrapperRef}
              className={`
              ${isOpenAccountMenu ? "" : "invisible"}
              absolute top-9 right-0 w-32 bg-white border-solid border-2 rounded-2xl border-silver font-primary  text-sm flex flex-col items-end overflow-hidden divide-y-1 divide-silver shadow-md
              `}>
                <li 
                className='w-full py-2 hover:bg-light-silver transition duration-100'
                onClick={() => navigate("/profile")}
                >
                  個人資訊
                </li>
                <li 
                className='w-full py-2 hover:bg-light-silver transition duration-100'
                onClick={() => navigate("/records")}
                >
                  預約／報名紀錄
                </li>
                <li 
                className='w-full py-2 hover:bg-light-silver transition duration-100'
                onClick={onLogout}
                >
                  登出
                </li>
              </ul>
            }
            {!isLogin &&
              <ul 
              ref={wrapperRef}
              className={`
              ${isOpenAccountMenu ? "" : "invisible"}
              absolute top-9 right-0 w-32 bg-white border-solid border-2 rounded-2xl border-silver font-primary  text-sm flex flex-col items-end overflow-hidden divide-y-1 divide-silver shadow-md
              `}>
                <li 
                className='w-full py-2 hover:bg-light-silver transition duration-100'
                onClick={() => navigate("/login")}
                >
                  登入
                </li>
              </ul>
            }
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
