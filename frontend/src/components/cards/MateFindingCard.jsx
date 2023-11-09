import { useState } from "react"
import { Link } from "react-router-dom"

function MateFindingCard(props) {
  const text = props.text || "";
  const secondText = props.secondText || "";
  const bg = props.bg || "";
  const link = props.link || "";

  return (
    <Link to={link}>
      <div className="group relative z-0 w-[468px] h-[468px] rounded-3xl overflow-hidden">
        <div className={`absolute w-full h-full ${bg} bg-contain blur-sm contrast-110 brightness-75 scale-101 group-hover:scale-110 transition duration-500`} />
        <div className="absolute w-full h-full flex justify-center items-center rounded-3xl">
          <span className="font-bold text-white text-2xl text-center">
            {text}
          </span>
          <button className="absolute inset-x-0 bottom-10 mx-40 py-2 bg-white rounded-full border-gray border-solid border-2 text-base font-medium group-hover:bg-light-silver transition duration-300">
            {secondText}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default MateFindingCard;