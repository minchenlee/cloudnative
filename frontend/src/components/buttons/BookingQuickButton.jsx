import { useState } from "react"
import { Link } from "react-router-dom"
import FeatherIcon from 'feather-icons-react';

function BookingQuickButton() {
  return (
    <Link to={"/booking"}>
      <button className="text-white font-semibold bg-black px-2 py-3 rounded-full flex items-center">
        <p className="text-xl ms-2">預約球場</p>
        <span className="ms-1">
          <FeatherIcon icon="arrow-right" width="48" height="48" strokeWidth="3"/>
        </span>
      </button>
    </Link>
  );
};

export default BookingQuickButton;
