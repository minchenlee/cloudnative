import React from "react";
import { useState, useEffect, useContext } from "react";
import FeatherIcon from 'feather-icons-react';
import JoinContext from "../../contexts/JoinContext";

function Modal({width, title, showClose, children}) {
  const { isModalOpen, setIsModalOpen } = useContext(JoinContext);
  const [ modalSmoother, setModalSmoother ] = useState(false);

  // 確保 Modal 預設為關閉狀態
  useEffect(() => {
    setIsModalOpen(false);
  }, [])

  // 讓 Modal 有淡出效果
  useEffect(() => {
    if (isModalOpen){
      setModalSmoother(true);
    }
  }, [isModalOpen])

  // 點擊背景關閉 Modal
  const onClose = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setModalSmoother(false);
    }, 500);
  };

  return (
    <>
      {/* 背景 */}
      <div
        className={`fixed inset-0 backdrop-blur-sm backdrop-brightness-75 w-full h-full z-40 transition duration-500 ${isModalOpen ? "opacity-100" : "opacity-0"} ${modalSmoother ? "" : "invisible"}`}
        onClick={onClose}
      />
      {/* Modal 主體*/}
      <div className={`fixed flex inset-[${width}] items-center justify-center z-50 transition duration-500 ${isModalOpen ? "visible opacity-100" : "opacity-0"}  ${modalSmoother ? "" : "invisible"}`}>
        <div className={`flex flex-col w-full min-w-[${width}] bg-white bg-opacity-75 rounded-3xl pt-6 pb-10 px-10`}>
          <div className="flex flex-row w-full justify-between items-center mb-6 pb-3 border-b-2 border-silver">
            <p className="text-xl font-semibold">{title}</p>
            <button className={`text-gray hover:text-dark-gray transition duration-300 ${showClose ? "": "invisible"}`} onClick={onClose}>
              <FeatherIcon icon="x" width="32" height="32" strokeWidth="3"/>
            </button>
          </div>
          {children}
        </div>
      </div>
      {/* helping vite to render */}
      <div className="inset-[28rem] invisible"></div>
    </>
  );
};

export default Modal;
