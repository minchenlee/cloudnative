import SignupCard from "../components/cards/SignUpCard";

function AdminSignUpPage(){
  return(
    <div className="flex flex-col items-center justify-center h-[calc(100vh-78px)] w-full bg-login-bg bg-cover">
      <SignupCard isForAdmin={true}/>
    </div>
  )
}

export default AdminSignUpPage;
