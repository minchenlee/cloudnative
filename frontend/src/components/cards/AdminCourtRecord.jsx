import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import FeatherIcon from "feather-icons-react";
import AllContext from "../../contexts/AllContext";


function InfoRow(){
	const {isModalOpen, setIsModalOpen} = useContext(AllContext);

  return(
		<div className="h-36 w-full flex flex-row items-center border-b-1 last:border-none">
			<div className="w-1/3 text-dark-gray font-robotoMono">
				08:00~09:00
			</div>
			<div className="w-1/3 text-dark-gray flex flex-col">
				<p>由 Peter 創建</p>
				<p className="font-robotoMono">0919-332-423</p>
				<p><span className="font-robotoMono">3/5</span> 人</p>
			</div>
			<div className="w-1/3 text-dark-gray font-medium">
				<button className="w-full py-2 rounded-full border-1 hover:bg-light-silver duration-300"
				onClick={()=>setIsModalOpen(true)}
				>
					管理租借
				</button>
			</div>
		</div>
  )
}


function AdminCourtRecordCard({previewData}) {
  const {isModalOpen, setIsModalOpen} = useContext(AllContext);

  return (
    <div className={`group sticky top-28 z-0 w-full h-[700px] bg-white rounded-3xl shadow-[2px_4px_8px_1px_rgba(0,0,0,0.25)] flex flex-col border-2 border-silver`}>
      <div className="flex flex-col text-black overflow-y-auto">
        <div className="sticky top-0 flex flex-row items-center px-7 py-4 border-b-1 rounded-t-3xl bg-white">
					<p className="w-1/3 text-xl font-semibold">基本資訊</p>
					<p className="w-1/3 text-base font-semibold"> 細節 </p>
				</div>
        <div className="flex flex-col gap-4 px-7">
					<InfoRow/>
					<InfoRow/>
					<InfoRow/>
					<InfoRow/>
					<InfoRow/>
					<InfoRow/>
					<InfoRow/>
					<InfoRow/>
					<InfoRow/>
					<InfoRow/>
        </div>
      </div>
    </div>
  );
};


export default AdminCourtRecordCard;
