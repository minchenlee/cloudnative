import { useState, useEffect, useRef, useContext, createContext } from "react"
import FeatherIcon from 'feather-icons-react';
import SearchBar from "../components/SearchBar";
import FilterButton from "../components/buttons/FilterButton";
import BackButton from "../components/buttons/BackButton";
import SiteCard from "../components/cards/StadiumCard";
import SiteStatusDirection from "../components/directions/SiteStatusDirection";
import TimeDirection from "../components/directions/TimeDirection";

import { dummyJson4StadiumData } from "../dummyJson/bookingDummy";
import JoinContext from "../contexts/JoinContext";
import WeekPicker from "../components/input/WeekPicker";


const classifyWeekStatus = (weekStatus) => {
  const weekStatusArray = Object.values(weekStatus);
  return
}



function BookingStadiumPage(){
  const BookingDetailContext = createContext(null);
  const [dayInterval, setDayInterval] = useState(0);
  const {selectedDayCode, setSelectedDayCode, selectedSport, setSelectedSport} = useContext(JoinContext);
  useEffect (() => {
    setSelectedDayCode(0);
  }, [])

  // 利用 curretPage 去 call 相對應的 API
  const currentPage = window.location.href.split("/").pop();

  // 假資料
  const stadiumData = {
    name: "新生籃球場",
    img_url: "../src/assets/image/新生籃球場.jpg",
    inOrOut: "室外",
    numberOfCourts: 3,
    weekStatus: {
      Sun: {
        morning: "plenty",
        afternoon: "some",
        evening: "none"
      },
      Mon: {
        morning: "plenty",
        afternoon: "some",
        evening: "none"
      },
      Tue: {
        morning: "plenty",
        afternoon: "some",
        evening: "none"
      },
      Wed: {
        morning: "plenty",
        afternoon: "some",
        evening: "none"
      },
      Thu: {
        morning: "plenty",
        afternoon: "some",
        evening: "none"
      },
      Fri: {
        morning: "plenty",
        afternoon: "some",
        evening: "none"
      },
      Sat: {
        morning: "plenty",
        afternoon: "some",
        evening: "none"
      }
    }
  };

  // 用來控制 Carousel 的 scroll
  const CarouselRef = useRef(null);
  const scroll = (scrollOffset) => {
    CarouselRef.current.scrollLeft += scrollOffset;
  };

  // 用來控制 Carousel 的 button
  function CarouselButton(props){
    const offset = props.offset || "";
    const icon = props.icon || "";

    return(
      <button onClick={()=>scroll(offset)} className="text-dark-gray bg-white rounded-full hover:bg-dark-gray hover:text-white transition duration-300 flex justify-center p-2">
        <FeatherIcon icon={icon} width="38" height="38" strokeWidth="4"/>
      </button>
    )
  }

  return(
    <BookingDetailContext.Provider value={{dayInterval, setDayInterval}}>
      <div className="container mx-auto">
        <div className="relative px-16  w-full max-w-[1280px] mx-auto mt-16 mb-10 flex flex-col">
          <div className="flex flex-row justify-center items-center">
            <div className="absolute left-0">
              <BackButton linkMode={true} linkTo={'/booking'}/>
            </div>
            <div className="flex flex-row justify-center gap-3 h-14">
              <SearchBar />
              <FilterButton/>
            </div>
          </div>
          {/* using tailwind scrollbar package to control scrollbar*/}
          <div className="w-full mx-auto relative mt-12 px-8 py-2 flex flex-row justify-start overflow-x-auto gap-[34px] snap-x scrollbar scrollbar-none scroll-smooth" ref={CarouselRef}>
            { dummyJson4StadiumData.map((stadiumData, index) => {
              return(
                <SiteCard stadiumData={stadiumData} key={index}/>
              )
            })}

            <div className="invisible mx-8">
              <SiteCard stadiumData={""}/>
            </div>
          </div>
          <div className="mt-14">
            <SiteStatusDirection/>
          </div>
          <div className="absolute bottom-[128px] left-0">
            <TimeDirection/>
          </div>
          <div className="absolute bottom-72 right-0">
            <CarouselButton offset={190} icon="chevron-right"/>
          </div>
          <div className="absolute bottom-72 left-0">
            <CarouselButton offset={-190} icon="chevron-left"/>
          </div>
        </div>
      </div>
    </BookingDetailContext.Provider>
  )
}

export default BookingStadiumPage
