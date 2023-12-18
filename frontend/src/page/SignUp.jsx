import SignupCard from "../components/cards/SignUpCard";

function SignUpPage(){
  return(
    <div className="flex flex-col items-center justify-center h-[calc(100vh-78px)] w-full bg-login-bg bg-cover">
      <SignupCard/>
    </div>
  )
}

export default SignUpPage;
