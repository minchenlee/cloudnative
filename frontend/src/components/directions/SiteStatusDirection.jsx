import StatusDot from "../general/StatusDot"

function DirectionPair(props) {
  const text = props.text || "";
  const status = props.status || "";

  return (
    <div className="flex items-center gap-2">
      <StatusDot status={status}/>
      <p>{text}</p>
    </div>
  )
}

// function SiteStatusDirection() {
//   return (
//     <div className="flex flex-row items-center justify-center gap-6 text-sm font-base text-dark-gray">
//       <DirectionPair text="還有很多球場" status="plenty"/>
//       <DirectionPair text="剩一些些" status="some"/>
//       <DirectionPair text="沒有球場了" status="none"/>
//     </div>
//   )
// }


function SiteStatusDirection() {
  return (
    <div className="flex flex-row items-center justify-center gap-6 text-sm font-base text-dark-gray">
      <DirectionPair text="尚有球場" status="some"/>
      <DirectionPair text="沒有球場了" status="none"/>
    </div>
  )
}

export default SiteStatusDirection;
