function TimeIntervalDirection(props) {
  const text = props.text || "";
  const time = props.time || "";
  const bg = props.bg || "";
  const color = props.color || "";

  return (
    <div className="w-72 h-14 flex items-center text-xl text-dark-gray bg-white border-solid border-gray border-1 rounded-full shadow-[0px_2px_5px_2px_rgba(0,0,0,0.1)]">
      <div className={`h-full w-1/3 bg-${bg} rounded-full flex items-center`}>
        <p className={`text-${color} font-bold w-full text-center`}>{text}</p>
      </div>
      <div className="w-2/3">
        <p className="font-robotoMono font-semibold text-center">{time}</p>
      </div>
    </div>
  )
}

export default TimeIntervalDirection;
