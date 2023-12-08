import { useState, useContext } from "react"
import { Link } from "react-router-dom"
import FeatherIcon from 'feather-icons-react';



function SearchBar(props) {

  const setWeekPickerOpen = props.setWeekPickerOpen
  const weekPickerOpen = props.weekPickerOpen

  return (
    <div className="relative text-dark-gray font-semibold bg-white w-[378px] px-2 py-3 rounded-full border-solid border-silver border-2 shadow-md flex items-center">
      <div className="w-full h-full pe-8 divide-x-2">
        <button className="w-1/2 h-full text-base text-center">所有場地</button>
        <button className="w-1/2 h-full text-base text-start ps-3 font-robotoMono"
          onClick={() => setWeekPickerOpen(!weekPickerOpen)}>12/04 - 12/10
        </button>
      </div>
      <button className="absolute right-2 p-2 rounded-full bg-primary text-white flex justify-center items-center">
        <FeatherIcon icon="search" width="24" height="24" strokeWidth="4" />
      </button>
    </div>
  );
};

export default SearchBar;
