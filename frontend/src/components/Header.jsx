import { useState } from 'react'
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className='sticky top-0 z-30 container'>
      <div  className='w-screen px-48 pt-9 pb-2 flex flex-row bg-white border-solid border-b-2 border-silver'>
        <p className='font-primary font-semibold text-xl'>stadium.</p>
        <div className='flex grow justify-end space-x-20'>
          <button className='font-primary font-semibold text-base'><Link to="/booking">預約球場</Link></button>
          <button className='font-primary font-semibold text-base'><Link to="/findmate">找球友</Link></button>
          <button className='font-primary font-semibold text-base'><Link to="/records">預約／報名紀錄</Link></button>
          <button className='text-xl'>
            <i className="bi bi-person-circle"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
