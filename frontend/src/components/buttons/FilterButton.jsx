import { useState } from "react"
import { Link } from "react-router-dom"
import FeatherIcon from 'feather-icons-react';

function FilterButton() {
  return (
    <button className="text-dark-gray font-medium bg-white px-2 py-3 rounded-full border-solid border-silver border-2 shadow-md flex justify-center items-center w-28">
      <p className="text-base ms-2">篩選</p>
      <span className="ms-1">
        <FeatherIcon icon="filter" width="19.44" height="17.5" strokeWidth="3"/>
      </span>
    </button>
  );
};

export default FilterButton;
