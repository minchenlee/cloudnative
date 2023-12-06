import { useState } from "react"
import { useNavigate, Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';

function BackButton({linkMode, linkTo}) {
  const navigate = useNavigate();

  if (linkMode) {
    return(
      <Link to={linkTo} 
      className="group font-semibold hover:bg-black px-4 py-3 rounded-full flex items-center gap-8 transition duration-500"
      >
        <span className="text-gray group-hover:text-white transition duration-500">
          <FeatherIcon icon="arrow-left" width="48" height="48" strokeWidth="3"/>
        </span>
        <p className="text-xl me-3 text-white opacity-0 group-hover:opacity-100 transition duration-500">返回</p>
      </Link>
    )
    } else {
    return(
      <button 
      className="group font-semibold hover:bg-black px-4 py-3 rounded-full flex items-center gap-8 transition duration-500"
      onClick={()=>navigate(-1)}
    >
      <span className="text-gray group-hover:text-white transition duration-500">
        <FeatherIcon icon="arrow-left" width="48" height="48" strokeWidth="3"/>
      </span>
      <p className="text-xl me-3 text-white opacity-0 group-hover:opacity-100 transition duration-500">返回</p>
    </button>
    )
  }
};


export default BackButton;
