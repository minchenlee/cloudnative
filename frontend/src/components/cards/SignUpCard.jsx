import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { postData } from "../../utilities/api"
import AllContext from "../../contexts/AllContext";
import UseAnimations from "react-useanimations";
import visibility from 'react-useanimations/lib/visibility'
import toast from 'react-hot-toast';
import 'ldrs/ring2'


function SignUpCard({isForAdmin}){
  const { isLogin, setIsLogin } = useContext(AllContext);
  const [isWaiting, setIsWaiting] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
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

  // 處理註冊 request
  const onSubmit = async(rawData) => {
    const { email, password } = rawData;

    const data = {
      email: email,
      password: password,
      role: isForAdmin ? "VENDOR" : "PLAYER"
    }

    setIsWaiting(true); // 送出 request 時，按鈕變成 loading 狀態
    const response = await postData("users", JSON.stringify(data));
    try {
      if (response.data.token){
        setIsLogin(true);

        // 一般使用者登入
        if (!isForAdmin){
          window.localStorage.setItem("Stadium-player-isLogin", response.data.token);
          navigate("/booking");
        }

        // 管理員登入
        if (isForAdmin){
          window.localStorage.setItem("Stadium-vendor-isLogin", response.data.token);
          navigate("/admin");
        }

        toast.success("註冊成功");
        return
      }

      if (response.data.message === "User already exists"){
        toast.error("此信箱已被註冊");
      }

      else {
        toast.error(`註冊失敗：${response.data.message}`);
      }

    } catch (error){
      toast.error("請將錯誤訊息截圖，並聯繫客服："  + error.message);
      setTimeout(() => {
        setIsWaiting(false);
      }, 2000);
    }
  }

  return(
    <div className="w-[32rem] p-10 border-black border-1 rounded-3xl backdrop-blur backdrop-brightness-110">
      <div className="flex flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold ">stadium.</h1>
        <button 
          className="w-20 flex items-center justify-center"
          onClick={() => isForAdmin ? navigate("/admin/login") : navigate("/login")}
        >
          <p className=' underline underline-offset-2'>去登入</p>
        </button>
      </div>
      <form className="flex flex-col text-base" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("email", { 
            required: true, 
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
              message: "不符合信箱格式，範例：example@gmail.com"
            }
          })}
          className="border-1 border-solid border-gray rounded-lg px-3 py-1 font-robotoMono focus:outline-none focus:ring-1 ring-primary" 
          placeholder="Email" 
        />
        {errors.email?.type === "pattern" && HintMessage({text: errors.email.message, textColor: "text-yellow-500"})}
        {errors.email?.type === "required" && HintMessage({text: "請輸入信箱"})}
        <div className='w-full relative'>
          <input 
            {...register("password", { 
              required: true,
              minLength: {
                value: 8,
                message: "密碼長度不得小於 8 個字元"
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i,
                message: "密碼需由英文和數字組成"
              }
            })}
            className="w-full mt-5 border-1 border-solid border-gray rounded-lg px-3 py-1 font-robotoMono focus:outline-none focus:ring-1 ring-primary" 
            placeholder="Password" 
            type={passwordShown ? "text" : "password"}
          />
          <div  className='absolute right-3 top-5'>
            <UseAnimations 
              animation={visibility} 
              size={32}
              reverse={true}
              onClick={() => setPasswordShown(!passwordShown)}
            />
          </div>
        </div>
        {errors.password?.type === "required" && HintMessage({text: "請輸入密碼"})}
        {errors.password?.type === "minLength" && HintMessage({text: errors.password.message, textColor: "text-yellow-500"})}
        {errors.password?.type === "pattern" && HintMessage({text: errors.password.message, textColor: "text-yellow-500"})}
        <button className="mt-5 bg-primary text-white rounded-full py-2 font-semibold hover:bg-black duration-300">
          註冊
        </button>
      </form>
    </div>
  )
}

function HintMessage(props){
  const text = props.text || "";
  const textColor = props.textColor || "text-red-600 ";

  return(
    <span className={`${textColor} text-sm font-semibold font-robotoMono}`}>
      {text}
    </span>
  )
}

export default SignUpCard
