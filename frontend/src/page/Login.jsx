import LoginCard from "../components/cards/LoginCard";

function Loginpage(){
  
  return(
    <div className="flex flex-col items-center justify-center h-[calc(100vh-78px)] w-full bg-login-bg bg-cover">
      <LoginCard/>
    </div>
  )
}

export default Loginpage;
