import Header from "../components/Header";
import BackButton from "../components/buttons/BackButton";

const ErrorPage = () => {
  return (
    <>
      <div className="container mx-auto h-screen w-screen flex flex-col justify-center items-center">
        <h1 className="text-[56px] font-bold font-robotoMono">404</h1>
        <p className="text-2xl font-semibold mb-2">無法找到這個頁面</p>
        <p className="text-2xl text-gray font-semibold mb-5">看來有東西壞了!</p>
        <BackButton/>
      </div>
    </>
  );
};

export default ErrorPage;
