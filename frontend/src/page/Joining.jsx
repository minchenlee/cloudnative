import { useState, useContext, useEffect } from "react"
import { dayCodeToChineseDay } from "../utilities/DayCodeConverter"
import JoinContext from "../contexts/JoinContext"
import BackButton from "../components/buttons/BackButton"
import SearchBar from "../components/SearchBar"
import FilterButton from "../components/buttons/FilterButton"
import MateDayStatusCard from "../components/cards/MateDayStatusCard"

function JoiningPage(){
  // Dummy Data
  let rawJsonData = [
    {
      "date": "12/04",
      "numberOfCourts": "12"
    },
    {
      "date": "12/05",
      "numberOfCourts": "6"
    },
    {
      "date": "12/06",
      "numberOfCourts": "3"
    },
    {
      "date": "12/07",
      "numberOfCourts": "6"
    },
    {
      "date": "12/08",
      "numberOfCourts": "9"
    },
    {
      "date": "12/09",
      "numberOfCourts": "2"
    },
    {
      "date": "12/10",
      "numberOfCourts": "7"
    }
  ];

  // Fixed Data, Don't Touch
  const fixedData = [
    {
      "link": "/findmate/join/sun",
      "dayCode": 0
    },
    {
      "link": "/findmate/join/mon",
      "dayCode": 1
    },
    {
      "link": "/findmate/join/tue",
      "dayCode": 2
    },
    {
      "link": "/findmate/join/wen",
      "dayCode": 3
    },
    {
      "link": "/findmate/join/thu",
      "dayCode": 4
    },
    {
      "link": "/findmate/join/fri",
      "dayCode": 5
    },
    {
      "link": "/findmate/join/sat",
      "dayCode": 6
    }
  ];

  // merge data
  const jsonData = rawJsonData.map((data, index) => {
    return {
      date: data.date,
      numberOfCourts: data.numberOfCourts,
      dayCode: fixedData[index].dayCode,
      day: dayCodeToChineseDay(fixedData[index].dayCode),
      link: fixedData[index].link
    }
  })

  // 取得資料後存入 localStorage
  useEffect(() => {
    console.log("call api");
    window.localStorage.setItem("joinJson", JSON.stringify(jsonData));
  }, [jsonData])
  
  const { selectedSport, setSelectedSport} = useContext(JoinContext);
  // 處理選擇的運動項目
  const handleSportClick = (sport) => {
    setSelectedSport(sport);
  }

  

  // 重新 call API
  useEffect(() => {
    // console.log("call api");
  }, [selectedSport])

  // 分類項目
  function CategoryItem({text, sport, selected, onClick}){
    return  (
      <button className={`w-full flex items-center justify-center px-8 py-6 text-2xl font-medium text-black hover:bg-light-silver ${selected ? 'decoration-2 underline underline-offset-8' : ''}`} onClick={()=>onClick(sport)}>{text}</button>
    )
  }

  // 分類卡片
  function CategoryCard(){
    return (
      <div className="w-36 flex flex-col items-center bg-white rounded-3xl shadow-md border-2 border-silver overflow-hidden">
        <CategoryItem text="籃球🏀" sport="basketball" selected={selectedSport === 'basketball'} onClick={handleSportClick}/>
        <CategoryItem text="羽球🏸" sport="badminton" selected={selectedSport === 'badminton'} onClick={handleSportClick}/>
        <CategoryItem text="排球🏐" sport="volleyball" selected={selectedSport === 'volleyball'} onClick={handleSportClick}/>
        <CategoryItem text="網球🎾" sport="tennis" selected={selectedSport === 'tennis'} onClick={handleSportClick}/>
        <CategoryItem text="桌球🏓" sport="tabletennis" selected={selectedSport === 'tabletennis'} onClick={handleSportClick}/>
      </div>
    )
  }

  return(
    <div className="container mx-auto">
      <div className="relative px-24  w-full max-w-[1280px] mx-auto mt-4 mb-10 flex flex-col">
        <div className="flex flex-row justify-center items-center">
          <div className="absolute left-0">
            <BackButton linkMode={true} linkTo="/findmate"/>
          </div>
          <div className="w-full h-28 flex flex-row items-center py-8 border-b-2 border-silver">
            <div className="w-1/3">
              <h1 className="text-2xl font-semibold text-black">尋找球場報名</h1>
            </div>
            <div className="flex flex-row justify-center gap-3 h-14">
              <SearchBar/>
              <FilterButton/>
            </div>
            <div className="w-1/3"/>
          </div>
        </div>
        <div className="w-full flex flex-row mt-10">
          <div className="w-1/4">
            <CategoryCard/>
          </div>
          <div className="w-1/2">
            <div className="flex flex-col gap-6 items-center">
              {jsonData.map((card, index) => (
                <MateDayStatusCard
                  key={index}
                  date={card.date}
                  numberOfCourts={card.numberOfCourts}
                  dayCode={card.dayCode}
                  day={card.day}
                  link={card.link}
                />
              ))}
            </div>
          </div>
          <div className="w-1/4"></div>
        </div>
      </div>
    </div>
  )
}

export default JoiningPage
