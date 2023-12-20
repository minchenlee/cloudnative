import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { postData } from "../../utilities/api"
import AllContext from "../../contexts/AllContext";
import toast from "react-hot-toast";
import 'ldrs/ring2'

function LogInModal(props){
  const isForBooking = props.isForBooking;
  const { isLogin, setIsLogin } = useContext(AllContext);
  const { email, setEmail, password, setPassword, setIsModalOpen } = useContext(AllContext);
  const [isWaiting, setIsWaiting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  // 處理登入 request
  const onSubmit = async(data) => {
    setIsWaiting(true); // 送出 request 時，按鈕變成 loading 狀態
    const response = await postData("users/login", JSON.stringify(data));
    try {
      if (response.data.token){
        // 一般使用者登入
        if (response.data.user.role === "PLAYER") {
          window.localStorage.setItem("Stadium-player-token", response.data.token);
          setIsLogin(true);
          setIsModalOpen(false);
          setIsWaiting(false);
          setEmail("");
          setPassword("");
          toast.success("登入成功");
        }
        return;
      }

      if (response.data.message === "User not found"){
        toast.error("使用者不存在");
      }

      else if (response.data.message === "Invalid Password"){
        toast.error("密碼錯誤");
      }

      else {
        toast.error(`登入失敗：${response.data.message}`);
      }

      setTimeout(() => {
        setIsWaiting(false);
      }, 1000);

    } catch (error){
      toast.error("請將錯誤訊息截圖，並聯繫客服："  + error.message);
      setTimeout(() => {
        setIsWaiting(false);
      }, 1000);
    }
  }

  return(
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", { 
        })}
        className="w-full h-7 ps-2 border-1 rounded-md bg-transparent" 
        placeholder="電子郵件" 
        type="email"
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email?.type === "required" && HintMessage({text: "請輸入信箱"})}
      <input
        {...register("password", { 
          required: true,
        })}
        className="w-full h-7 ps-2 border-1 rounded-md bg-transparent mt-6"
        placeholder="密碼"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.password && HintMessage({text: "請輸入密碼"})}
      <button 
      className="w-full font-medium text-white bg-primary rounded-full h-9 flex items-center justify-center mt-6" 
      type='submit'>
        {isWaiting
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
    </form>
  )
}

function HintMessage(props){
  const text = props.text || "";
  const textColor = props.textColor || "text-red-600 ";

  return(
    <span className={`${textColor} ms-2 text-sm font-semibold font-robotoMono}`}>
      {text}
    </span>
  )
}

export default LogInModal