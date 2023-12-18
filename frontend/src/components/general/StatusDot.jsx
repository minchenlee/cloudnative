// function StatusDot(props) {
//   const status = props.status || "";
//   let color = "";

//   if (status == "plenty") {
//     color = "bg-white"
//   }

//   if (status == "some") {
//     color = "bg-silver"
//   }

//   if (status == "none") {
//     color = "bg-dark-gray"
//   }

//   return (
//     <div className={`w-[30px] h-[30px] rounded-full ${color} border-1 border-light-silver shadow-[inset_1px_2px_3px_0_rgba(0,0,0,0.4)]`}></div>
//   );
// }

import FeatherIcon from 'feather-icons-react';


function StatusDot(props) {
  const status = props.status || "";
  let color = "";

  if (status == "some" || status == 0) {
    color = "bg-light-silver"
    return (
      <div className={`w-[30px] h-[30px] rounded-full ${color} border-1 border-light-silver shadow-[inset_1px_2px_3px_0_rgba(0,0,0,0.4)] flex justify-center items-center`}>
      </div>
    );
  }

  if (status == "none" || status == 1) {
    color = "bg-primary"
    return (
      <div className={`w-[30px] h-[30px] rounded-full ${color} border-1 border-light-silver shadow-[inset_1px_2px_3px_0_rgba(0,0,0,0.4)] flex justify-center items-center`}>
         <FeatherIcon icon="x" width="28" height="28" strokeWidth="4" className="text-white"/>
      </div>
    );
  }

 

  
}

export default StatusDot;
