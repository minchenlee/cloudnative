import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// fonts import
import "@fontsource/roboto-mono"; // Defaults to weight 400
import "@fontsource/roboto-mono/600.css"

import { useState, useContext, useEffect } from "react"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import "./App.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import JoinContext from "./contexts/JoinContext"
import Layout from "./page/Layout"
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
      { path: "booking/:sport/detail/:day", element: <BookingDetailPage /> },
      { path: "booking/confirm", element: <BookingConfirmPage /> },
      { path: "booking/success", element: <BookingSucessPage /> },
      { path: "records", element: <RecordsPage /> },
    ],
  }
]);


function App() {
  // 選擇日期、選擇運動，由 Booking 流程和 Joining 流程共用
  const [selectedDayCode, setSelectedDayCode] = useState(0);
  const [selectedSport, setSelectedSport] = useState("basketball");

  // Email, Password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Modal 狀態追蹤
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Join Detail view
  const [selectedJoinId, setSelectedJoinId] = useState();
  
  // Join Context
  const joinContextValue = {
    selectedDayCode, setSelectedDayCode,
    selectedSport, setSelectedSport,
    email, setEmail,
    password, setPassword,
    isModalOpen, setIsModalOpen,
    selectedJoinId, setSelectedJoinId,
  }

  useEffect(() => {
    console.log("selectedDayCode: ", selectedDayCode);
    console.log("selectedSport: ", selectedSport);
  }, [selectedDayCode, selectedSport])

  useEffect(() => {
    console.log("selectedJoinId: ", selectedJoinId);

    if (selectedJoinId === undefined) return;

    const data = JSON.parse(window.localStorage.getItem("joinDetailJson"));
    console.log(data.find(item => item.id === selectedJoinId));
  }, [selectedJoinId])

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <JoinContext.Provider value={joinContextValue}>
          <RouterProvider router={router}/>
      </JoinContext.Provider>
    </LocalizationProvider>
  )
}

export default App
