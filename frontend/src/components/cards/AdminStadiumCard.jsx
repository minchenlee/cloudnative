import { useNavigate } from "react-router-dom";


function AdminStadiumCard(props){
  const id = props.id || "";
  const name = props.name || "";
  const courtNum = props.courtNum || 0;
  const navigate = useNavigate();

  return(
    <div className="flex flex-row justify-between border-silver border-2 rounded-3xl px-6 py-6">
      <div className="flex flex-row items-center">
        <h1 className="text-xl font-semibold">{name}</h1>
        <p className="font-semibold ms-16"><span className="font-robotoMono">{courtNum}</span> 個球場</p>
      </div>
      <div className="flex flex-row gap-4 font-medium">
        <button 
        className="w-48 h-12 text-white bg-primary rounded-full hover:bg-black duration-300"
        onClick={() => {navigate(`/admin/stadium/info?id=${id}`)}}
        >
          管理場地
        </button>
        {/* <button 
        className="w-48 h-12 text-black bg-white border-1 rounded-full hover:bg-light-silver duration-300" 
        onClick={() => {navigate(`/admin/stadium/status?id=${id}`)}}
        >
          查看租借情形
        </button> */}
      </div>
    </div>
  )
}

export default AdminStadiumCard;