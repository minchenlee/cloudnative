import { useState, useContext, useEffect } from "react"
import { dayCodeToChineseDay } from "../utilities/DayCodeConverter"
import AllContext from "../contexts/AllContext"
import BackButton from "../components/buttons/BackButton"
import SearchBar from "../components/input/SearchBar"
import FilterButton from "../components/buttons/FilterButton"
import MateDayStatusCard from "../components/cards/MateDayStatusCard"
import Modal from "../components/modals/Modal"
import { fetchData, postData } from "../utilities/api"
import dayjs from "dayjs"
import 'ldrs/mirage'

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

  const [isWaiting, setIsWaiting] = useState(false);
  const {dateCodeTable, setDateCodeTable} = useContext(AllContext); // 用來儲存日期和日期代碼的對應表
  const [activityData, setActivityData] = useState(null);  // 用來儲存球場資料
  const [selectedDate, setSelectedDate] = useState(dayjs()); // SearchBar, MUI Date Picker 會用到

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
  
  const { selectedSport, setSelectedSport} = useContext(AllContext);
  // 處理選擇的運動項目
  const handleSportClick = (sport) => {
    setSelectedSport(sport);
  }
  
  // 每當 selectedDate 改變，就會 call API
  const getStadiumData = async () => {
    setIsWaiting(true);
    const startYear = selectedDate.startOf('week').$y;
    const startMonth = selectedDate.startOf('week').$M + 1;
    const startDay = selectedDate.startOf('week').$D;
    const endYear = selectedDate.endOf('week').$y;
    const endMonth = selectedDate.endOf('week').$M + 1;
    const endDay = selectedDate.endOf('week').$D;

    // 處理時間
    // generate date between start and end date
    const dateArray = [];
    const startDate = dayjs(`${startYear}-${startMonth}-${startDay}`);
    const endDate = dayjs(`${endYear}-${endMonth}-${endDay}`);
    const diff = endDate.diff(startDate, 'day');
    for (let i = 0; i <= diff; i++) {
      dateArray.push(startDate.add(i, 'day').format('YYYY/MM/DD'));
    }

    // 用來讓 selectDateButton 取得日期
    const mergeData = dateArray.map((data, index) => {
      return {
        date: data.slice(5), // 用來顯示在 selectDateButton 上面，不需要年份
        fullDate: data, // 用來傳給 API
        dayCode: fixedData[index].dayCode,
        day: dayCodeToChineseDay(fixedData[index].dayCode),
        link: fixedData[index].link
      }
    })

    // console.log(mergeData);
    setDateCodeTable(mergeData);
    window.localStorage.setItem("Stadium-dateCodeTable", JSON.stringify(mergeData));

    const activitiesNumList = [];
    for ( const date of dateArray ) {
      let response = await fetchData(`activities/sport/${selectedSport}/date/${date.replaceAll('/', '-')}`);
      const data = response.data.activities;
      activitiesNumList.push(data.length);
    }
    // console.log(activitiesNumList);
    
    // 用來傳給 MateDayStatusCard
    const rawActivityData = mergeData.map((data, index) => {
      return {
        date: data.date,
        fullDate: data.fullDate,
        dayCode: data.dayCode,
        day: data.day,
        link: data.link,
        activitiesNum: activitiesNumList[index]
      }
    })

    // 把 activitiesNum === 0 的日期刪掉
    const filteredActivityData = rawActivityData.filter((data) => {
      return data.activitiesNum !== 0;
    })

    // console.log(filteredActivityData);
    setActivityData(filteredActivityData);
    setIsWaiting(false);
  }
  
  // 重新 call API
  useEffect(() => {
    getStadiumData();
  }, [selectedSport, selectedDate])

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
  console.log(activityData);

  return(
    <div className="container mx-auto px-24 ">
      <div className="relative w-full max-w-[1280px] mx-auto mt-4 mb-10 flex flex-col">
        <div className="flex flex-row justify-center items-center">
          <div className="absolute -left-24">
            <BackButton linkMode={true} linkTo="/findmate"/>
          </div>
          <div className="w-full h-28 flex flex-row items-center py-8 border-b-2 border-silver">
            <div className="w-1/3">
              <h1 className="text-2xl font-semibold text-black">尋找球場報名</h1>
            </div>
            <div className="flex flex-row justify-center gap-3 h-14">
              <SearchBar selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
              {/* <FilterButton/> */}
            </div>
            <div className="w-1/3"/>
          </div>
        </div>
        <div className="w-full flex flex-row mt-10">
          <div className="w-1/4">
            <CategoryCard/>
          </div>
          <div className="w-1/2">
            {(activityData !== null && activityData.length === 0 && !isWaiting) && 
            <div className="flex items-center justify-center h-full">
              <p className="text-2xl font-semibold text-black">本週無可報名球場</p>
            </div>
            }
            {isWaiting || activityData === null ? 
            <div className="flex items-center justify-center h-full">
              <div className="scale-125">
                <l-mirage
                size="75"
                speed="2.5"
                color="black"
                />
              </div>
            </div>
            :
            <div className="flex flex-col gap-6 items-center">
              {activityData.map((data, index) => (
                <MateDayStatusCard
                  key={index}
                  date={data.date}
                  day={data.day}
                  dayCode={data.dayCode}
                  link={data.link}
                  activitiesNum={data.activitiesNum}
                />
              ))}
            </div>
            }
          </div>
          <div className="w-1/4"></div>
        </div>
      </div>
    </div>
  )
}

export default JoiningPage
