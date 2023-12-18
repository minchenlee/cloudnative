import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import JoinContext from "../../contexts/JoinContext";
import toast from "react-hot-toast";

function LogInModal(props){
  const isForBooking = props.isForBooking;
  const { email, setEmail, password, setPassword, setIsModalOpen } = useContext(JoinContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // 這邊假裝 call API 並等待 1.5 秒 (實際上是直接跳轉到 /booking)
  useEffect(() => {
    if (isProcessing && isForBooking){
      setTimeout(() => {
        setIsModalOpen(false);
        setIsProcessing(false);
        toast.success("預約成功");
        navigate("/booking/success");
      }, 1500);
    }

    if (isProcessing && !isForBooking){
      setTimeout(() => {
        setIsModalOpen(false);
        setIsProcessing(false);
        toast.success("加入成功");
        navigate("/records");
      }, 1500);
    }

  }, [isProcessing])

  const handleSubmit = () => {
    setIsProcessing(true);
  }

  return(
    <div className="flex flex-col gap-6">
      <input 
        className="w-full h-7 ps-2 border-1 rounded-md bg-transparent" 
        placeholder="電子郵件" 
        type="email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="w-full h-7 ps-2 border-1 rounded-md bg-transparent"
        placeholder="密碼"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full font-medium text-white bg-primary rounded-full h-9 flex items-center justify-center" 
      onClick={handleSubmit}>
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
          <p>登入</p>
        }
      </button>
    </div>
  )
}


export default LogInModal