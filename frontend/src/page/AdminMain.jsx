import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom";
import AllContext from "../contexts/AllContext";
import { jwtDecode } from "jwt-decode";
import toast from 'react-hot-toast';

import * as api from "../utilities/api";
import AdminStadiumCard from "../components/cards/AdminStadiumCard";
import FeatherIcon from 'feather-icons-react';

function AddNewButton(){
  const navigate = useNavigate();
  return(
    <button 
    onClick={()=>{navigate("/admin/stadium/create")}}
    className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-row items-center w-44 py-5 text-white text-xl font-semibold bg-black rounded-full justify-center">
      <FeatherIcon icon="plus" width="36" height="36" strokeWidth="4" className="me-4"/>
      <p>新增場地</p>
    </button>
  )
}

function AdminMainPage(){
  const navigate = useNavigate();
  const {isLogin, setIsLogin} = useContext(AllContext);
  // 檢查是否有登入
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
  

  useEffect(()=>{
    const data = api.fetchData("stadiums/stadiums");
    console.log(data);
  }, [])

  return(
    <div className="container mx-auto sm:px-24 px-12">
      <div className="relative w-full max-w-[1280px] mt-12 mb-10 flex flex-col">
        <h1 className="text-2xl font-semibold border-b-1 pb-8 mb-8">所有場地</h1>
        <div className="flex flex-col gap-6">
          <AdminStadiumCard name="新生籃球場" courtNum={3} id={1}/>
          <AdminStadiumCard name="新生羽球場" courtNum={5} id={2}/>
          <AdminStadiumCard name="新生排球場" courtNum={2} id={3}/>
        </div>
      </div>
      <AddNewButton/>
    </div>
  )

}


export default AdminMainPage;