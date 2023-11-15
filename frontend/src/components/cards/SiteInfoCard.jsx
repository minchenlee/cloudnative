import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import FeatherIcon from "feather-icons-react";
import JoinContext from "../../contexts/JoinContext";
import Modal from "../modals/Modal";



// 在逗號後面加上換行符號
function addNewlineAfterComma(str) {
  return str.replace(/，/g, '，</br>');
}



function InfoRow({icon, content}){
  return(
    <div className="w-full h-11 flex flex-row items-center">
      <div className="mr-4 text-dark-gray">
        <FeatherIcon icon={icon} width="32" height="32" strokeWidth="2"/>
      </div>
      <div>
        <p>{content}</p>
      </div> 
    </div>
  )
}


function SiteInfoCard({previewData}) {
  const {isModalOpen, setIsModalOpen} = useContext(JoinContext);

  return (
    <div className={`group sticky top-24 z-0 w-[419px] h-[600px] bg-white rounded-3xl shadow-[2px_4px_8px_1px_rgba(0,0,0,0.25)] overflow-hidden `}>
      <div className="h-full w-full flex flex-col">
        <div className="w-full h-2/5 rounded-3xl bg-gray"></div>
        <div className="w-full h-3/5 flex flex-col px-7 text-black">
          <p className="text-xl font-semibold my-4">基本資訊</p>
          <div className="flex flex-col gap-4">
            {
              previewData.map((info, index) => (
                <InfoRow key={index} icon={info.icon} content={info.content}/>
              ))
            }
            <div className="w-full flex justify-center">
              <button className="px-8 py-2 font-semibold text-primary border-1 rounded-full hover:bg-light-silver transition duration-300" onClick={()=>setIsModalOpen(true)}>
                顯示更多資訊
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SiteInfoCard;
