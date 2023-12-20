import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postData } from "../../utilities/api"
import AllContext from "../../contexts/AllContext";
import toast from 'react-hot-toast';
import 'ldrs/ring2'


function LoginCard({isForAdmin}){
  const { isLogin, setIsLogin } = useContext(AllContext);
  const [isWaiting, setIsWaiting] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm()

  // 檢查是否有登入
  useEffect(() => {
    // 一般使用者登入
    if (!isForAdmin){
      const token = window.localStorage.getItem("Stadium-player-token")
      if (token){
        setIsLogin(true);
        navigate("/booking");
      }
    }

    // 管理員登入
    if (isForAdmin){
      const token = window.localStorage.getItem("Stadium-vendor-token")
      if (token){
        setIsLogin(true);
        navigate("/admin");
      }
    }
  }, [])

  // 處理登入 request
  const onSubmit = async(data) => {
    setIsWaiting(true); // 送出 request 時，按鈕變成 loading 狀態
    const response = await postData("users/login", JSON.stringify(data));
    try {
      if (response.data.token){
        // 一般使用者登入
        if (response.data.user.role === "PLAYER" && !isForAdmin) {
          window.localStorage.setItem("Stadium-player-token", response.data.token);
          setIsLogin(true);
          navigate("/booking");
          toast.success("登入成功");
        }

        // 管理員登入
        if (response.data.user.role === "VENDOR" && isForAdmin) {
          window.localStorage.setItem("Stadium-vendor-token", response.data.token);
          setIsLogin(true);
          navigate("/admin");
          toast.success("登入成功");
        }

        if (response.data.user.role === "PLAYER" && isForAdmin) {
          toast.error("請使用管理員帳號登入");
          setTimeout(() => {
            setIsWaiting(false);
          }, 1000);
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
    <div className="w-[32rem] p-10 border-black border-1 rounded-3xl backdrop-blur backdrop-brightness-110">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold ">stadium.</h1>
        <button 
          className="w-20 flex items-center justify-center"
          onClick={() => isForAdmin ? navigate("/admin/signup") : navigate("/signup")}
        >
          <p className=' underline underline-offset-2'>去註冊</p>
        </button>
      </div>
      <form className="flex flex-col text-base" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("email", { 
              required: true, 
            })}
            className="border-1 border-solid border-gray rounded-lg px-3 py-1 font-robotoMono focus:outline-none focus:ring-1 ring-primary" placeholder="Email" 
          />
          {errors.email?.type === "required" && HintMessage({text: "請輸入信箱"})}
          <input 
            {...register("password", { 
              required: true,
            })}
            className="mt-5 border-1 border-solid border-gray rounded-lg px-3 py-1 font-robotoMono focus:outline-none focus:ring-1 ring-primary" placeholder="Password" 
          />
          {errors.password && HintMessage({text: "請輸入密碼"})}
          <button 
          className="flex items-center justify-center mt-5 bg-primary text-white rounded-full py-2 font-robotoMono hover:bg-black duration-300"
          type='submit'
          >
            {isWaiting ?
            <l-ring-2
            size="24"
            stroke="5"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.7"
            color="white" 
          ></l-ring-2> 
            :
            <p className='font-semibold'>登入</p>
            }
            
          </button>
      </form>
    </div>
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

export default LoginCard
