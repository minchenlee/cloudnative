import { useState, useRef, useEffect } from "react";
import useOutsideClick from "../../utilities/useOutsideClick";
import FeatherIcon from "feather-icons-react";
import codeSportConverter  from "../../utilities/codeSportConverter.jsx"

function RowEditSelector(props){
    // 選項列表
    const optionList = props.optionList || [];
    // 編輯資料
    const editedData = props.editedData || null;
    const setEditedData = props.setEditedData || null;
    // 預設選項
    const defaultOption = props.defaultOption || optionList[0];
    const [seletedOption, setSeletedOption] = useState(defaultOption);
    const target = props.target || null;
  
    // 控制選單開關
    const [isSelecting, setIsSelecting] = useState(false);
    const handleSelecting = () => {
      setIsSelecting(!isSelecting);
    }
  
    // 處理點擊 component 外的事件
    const handleClickOutside = () => {
      setIsSelecting(false);
    };
    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, handleClickOutside);

    const convertIsIndoor = (option) => {
      const convertDict = {
        true: "室內",
        false: "室外",
        室內: true,
        室外: false,
      }
      return convertDict[option]
    }

    // 當選項改變時，更新編輯資料
    useEffect(()=>{
      if (target === "sport"){
        const convertedOption = codeSportConverter(seletedOption)
        setEditedData(editedData => ({...editedData, sport: convertedOption}));
      }

      if (target === "isIndoor"){
        const convertedOption = convertIsIndoor(seletedOption)
        setEditedData(editedData => ({...editedData, isIndoor: convertedOption}));
      }
    }
    , [seletedOption])
  
    return(
      <div ref={wrapperRef} className="flex flex-row items-center text-base ">
        <button 
        className="relative h-10 w-24 flex flex-row items-center justify-start ps-4 border-1 rounded-xl gap-1"
        onClick={handleSelecting}
        >
          <span>
            {seletedOption}
          </span>
          <FeatherIcon 
          icon="chevron-down" 
          width="24" 
          height="24" 
          strokeWidth="2" 
          className="text-dark-gray"
          />
          <div className={`absolute top-10 -left-[1px] w-[calc(100%+2px)] ${isSelecting ? "z-30" : "invisible"}`}>
            <ul className="flex flex-col mt-1 bg-white border-1 rounded-xl overflow-hidden divide-y-1">
              {optionList.map((option, index) => (
                <li 
                key={index}
                className="w-full h-12 flex flex-row items-center justify-start ps-4 hover:bg-light-silver duration-150"
                onClick={()=>setSeletedOption(option)}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        </button>
      </div>
    )
  }

  export default RowEditSelector;