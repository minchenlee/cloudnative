import { useState, useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import JoinContext from "../../contexts/JoinContext";
import Modal from "../../components/modals/Modal"
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import 'ldrs/ring2'


function SignUpGameCard(props) {

  const setModalCategory = props.setModalCategory
  const setCancelModalCategory = props.setCancelModalCategory

  // 詳細資訊、加入按鈕
  function Button(props) {
    const text = props.text || "";
    const bg = props.bg || "";
    const color = props.color || "";
    const hoverBg = props.hoverBg || "";
    const hoverColor = props.hoverColor || "";
    const onClick = props.onClick || null;
    const isProcessing = props.isProcessing || false;

    return (
      <button className={`flex flex-row justify-center items-center text-${color} font-medium bg-${bg} w-48 py-3 border-1 border-gray rounded-full hover:bg-${hoverBg} hover:text-${hoverColor} transition duration-500`} onClick={onClick}>
        {isProcessing
          ?
          <l-ring-2
            size="24"
            stroke="5"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.7"
            color="white"
          ></l-ring-2>
          :
          <p>{text}</p>
        }
      </button>
    )
  }

  // 球場名稱、開始時間、結束時間、主辦人、已招募人數、招募人數
  const id = props.id || "";
  const stadium = props.stadium || "";
  const court = props.court || "";
  const startTime = props.startTime || "";
  const endTime = props.endTime || "";
  const date = props.date || "";
  const master = props.master || "";
  const alreadyRecruitNumber = props.alreadyRecruitNumber || "";
  const recruitNumber = props.recruitNumber || "";

  // 詳細資訊 modal
  const { isModalOpen, setIsModalOpen, selectedJoinId, setSelectedJoinId } = useContext(JoinContext);
  const openModal = (id) => {
    setIsModalOpen(true);
    setSelectedJoinId(id);
    setModalCategory('查看詳細資訊')
  }

  const openCancelModal = (id) => {
    setIsModalOpen(true);
    setSelectedJoinId(id);
    setModalCategory('取消')
  }

 
  // 送出加入 request
  const [isProcessing, setIsProcessing] = useState(false);
  const handleJoin = () => {
    setIsProcessing(true);
  }


  // wait 2 sec and then set isProcessing to false, useNavigate to /record
  // 假裝 call API 並等待 2 秒 (實際上是直接跳轉到 /record)
  const navigate = useNavigate();
  useEffect(() => {
    if (isProcessing) {
      setTimeout(() => {
        setIsProcessing(false);
        navigate("/records");
      }, 2000);
    }

  }, [isProcessing])


  return (
    <div className="flex flex-row items-center w-full px-7 py-8 border-2 border-silver rounded-3xl shadow-[1px_1px_5px_1px_rgba(0,0,0,0.1)]">
      <div className="w-3/5 flex flex-row gap-4">
        <div className="w-1/2 flex flex-col items-start gap-4">
          <p className="text-xl font-semibold">{stadium}</p>
          <p className="text-xl font-medium font-robotoMono">{date}</p>
        </div>
        <div className="w-1/2 flex flex-col items-start gap-4">
          <p className="truncate text-xl font-semibold">{court}</p>
          <p className="font-robotoMono text-xl font-medium font-robotoMono">{startTime} ~ {endTime}</p>
        </div>
      </div>
      <div className="w-2/5 flex flex-row gap-7">
        <Button text="查看詳細資訊" bg="primary" color="white" hoverBg="black" onClick={() => openModal(id)} />
        <Button text="取消報名" bg="white" color="black" hoverBg="light-silve" isProcessing={isProcessing} onClick={() => openCancelModal(id)} />
      </div>
    </div>
  );
};

export default SignUpGameCard;
