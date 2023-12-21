import React from "react";
import { useState, useEffect, useContext } from "react";
import FeatherIcon from 'feather-icons-react';
import AllContext from "../../contexts/AllContext";

// inset 可以想成 margin 的概念，inset 越多，Modal 距離螢幕邊緣越遠，也就越小
function Modal({width, height, title, showClose, showDivide = true, children}) {
  const { isModalOpen, setIsModalOpen } = useContext(AllContext);
  const [ modalSmoother, setModalSmoother ] = useState(false);

  // 確保 Modal 預設為關閉狀態
  // useEffect(() => {
  //   setIsModalOpen(false);
  // }, [])


  useEffect(() => {
    if (isModalOpen){
      setModalSmoother(true);
      document.body.classList.add('disable-scroll'); // 禁止背景滾動
    }
    
    if (!isModalOpen){
      document.body.classList.remove('disable-scroll'); // 允許背景滾動
      // 在 Modal 關閉時，將背景淡出效果完成後再隱藏
      setTimeout(() => {
        setModalSmoother(false);
      }, 500);
    }
  }, [isModalOpen])

  // 點擊背景關閉 Modal
  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* 背景 */}
      <div
        className={`fixed inset-0 backdrop-blur-sm backdrop-brightness-75 w-full h-full z-40 transition duration-500 ${isModalOpen ? "opacity-100" : "opacity-0"} ${modalSmoother ? "" : "invisible"}`}
        onClick={onClose}
      />
      {/* Modal 主體*/}
      <div 
      className={`modal flex items-center justify-center z-50 transition duration-500 
      ${isModalOpen ? "visible opacity-100" : "opacity-0"}  
      ${modalSmoother ? "" : "invisible"}`}
      id="modal">
        <div className={`flex flex-col w-[${width}] h-[${height}] bg-white bg-opacity-90 rounded-3xl pt-6 pb-6 px-10`}>
          <div className={`flex flex-row w-full justify-between items-center mb-6 pb-3 border-silver ${showDivide ? "border-b-2" : ""}`}>
            <p className="text-xl font-semibold">{title}</p>
            <button className={`text-gray hover:text-dark-gray transition duration-300 ${showClose ? "": "invisible"}`} onClick={onClose}>
              <FeatherIcon icon="x" width="32" height="32" strokeWidth="3"/>
            </button>
          </div>
          {children}
        </div>
      </div>
      {/* helping tailwind to render */}
      <div className="w-[40rem] hidden">Joining Detail Modal</div>
      <div className="w-[50rem] h-[32rem] hidden">Booking Detail Modal</div>
      <div className="w-[29rem] hidden">Booking Confirm Modal</div>
      <div className="w-[38.75rem] h-[23rem] hidden">Booking Success Modal</div>
      <div className="w-[66rem] h-[34rem] hidden">Booking Fail Modal</div>
      <div className="w-[26.25rem] h-[18rem] hidden">Record Cancel sModal</div>
    </>
  );
};

export default Modal;
