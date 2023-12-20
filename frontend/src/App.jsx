import {createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useContext, useEffect } from "react"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import "./App.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import AllContext from "./contexts/AllContext"
import Layout from "./layout/Layout"
import ScrollToTop from "./utilities/ScrollToTop";
import ErrorPage from "./page/Error";
import BookingPage from "./page/Booking"
import BookingStadiumPage from "./page/BookingStadiumPage";
import BookingDetailPage from "./page/BookingDetail";
import BookingConfirmPage from "./page/BookingConfirm";
import BookingSucessPage from "./page/BookingSucess";
import MateFindingPage from "./page/MateFinding"
import JoiningPage from "./page/Joining"
import JoiningDetailPage from "./page/JoiningDetail";
import RecordsPage from "./page/Records";
import ProfilePage from "./page/Profile";
import Loginpage from "./page/Login";
import SignUpPage from "./page/SignUp";

import AdminLayout from "./layout/AdminLayout";
import AdminMainPage from "./page/AdminMain";
import AdminStadiumPage from "./page/AdminStadium";
import AdminCreateStadiumPage from "./page/AdminCreateStadium";
import AdminCourtStatusPage from "./page/AdminCourtStatus";
import AdminLoginpage from "./page/AdminLogin";
import AdminSignUpPage from "./page/AdminSignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <BookingPage />},
      { path: "booking", element: <BookingPage />},
      { path: "findmate", element: <MateFindingPage /> },
      { path: "findmate/join", element: <JoiningPage /> },
      { path: "findmate/join/:day", element: <JoiningDetailPage /> },
      { path: "booking/:sport", element: <BookingStadiumPage /> },
      { path: "booking/:sport/detail", element: <BookingDetailPage /> },
      { path: "booking/confirm", element: <BookingConfirmPage /> },
      { path: "booking/success", element: <BookingSucessPage /> },
      { path: "records", element: <RecordsPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "login", element: <Loginpage /> },
      { path: "signup", element: <SignUpPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <AdminMainPage />},
      { path: "stadium/status", element: <AdminCourtStatusPage />},
      { path: "stadium/info", element: <AdminStadiumPage />},
      { path: "stadium/create", element: <AdminCreateStadiumPage />},
      { path: "login", element: <AdminLoginpage /> },
      { path: "signup", element: <AdminSignUpPage /> },
    ],
  }
]);


function App() {
  // 檢查登入狀態
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    window.localStorage.setItem("Stadium-isLogin", isLogin);
  }, [isLogin])

  // 日期與日代碼的轉換表
  const [dateCodeTable, setDateCodeTable] = useState([]);

  // 選擇日期、選擇運動，由 Booking 流程和 Joining 流程共用
  const [selectedDayCode, setSelectedDayCode] = useState(0);
  const [selectedSport, setSelectedSport] = useState("basketball");
  const [selectedYearAndDay, setSelectedYearAndDay] = useState();

  // Email, Password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Modal 狀態追蹤
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  // Join Detail view
  const [selectedJoinId, setSelectedJoinId] = useState();
  
  // All Context
  const AllContextValue = {
    isLogin, setIsLogin,
    dateCodeTable, setDateCodeTable,
    selectedDayCode, setSelectedDayCode,
    selectedSport, setSelectedSport,
    selectedYearAndDay, setSelectedYearAndDay,
    email, setEmail,
    password, setPassword,
    isModalOpen, setIsModalOpen,
    modalType, setModalType,
    selectedJoinId, setSelectedJoinId,
  }

  // 用來從 localStorage 取得選擇的日期
  useEffect(() => {
    setSelectedDayCode(window.localStorage.getItem("Stadium-selectedDayCode"));
  }, [])

  useEffect(() => {
    console.log("selectedDayCode: ", selectedDayCode);
    console.log("selectedSport: ", selectedSport);
  }, [selectedDayCode, selectedSport])

  useEffect(() => {
    console.log("selectedJoinId: ", selectedJoinId);
    if (selectedJoinId === undefined) return;
    const data = JSON.parse(window.localStorage.getItem("joinDetailJson"));
    // console.log(data.find(item => item.id === selectedJoinId));
  }, [selectedJoinId])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <AllContext.Provider value={AllContextValue}>
          <RouterProvider router={router}/>
      </AllContext.Provider>
    </LocalizationProvider>
  )
}

export default App
