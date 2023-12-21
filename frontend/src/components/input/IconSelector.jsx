import { useRef } from "react";
import useOutsideClick from "../../utilities/useOutsideClick";
import FeatherIcon from "feather-icons-react";
import iconList from "../../dummyJson/iconList";

function IconSelector(props){
    const iconList = props.iconList || [];
    const selectedIcon = props.selectedIcon ||  iconList[0];
    const isIconSelecting = props.isIconSelecting || false;
    const setSelectedIcon = props.setSelectedIcon || null;
    const setIsIconSelecting = props.setIsIconSelecting || null;

    // 處理點擊 component 外的事件
    const handleClickOutside = () => {
        setIsIconSelecting(false);
    };

    // 點擊 component 外時，關閉 icon selector
    const wrapperRef = useRef(null);
    useOutsideClick(wrapperRef, handleClickOutside);

    return(
        <div ref={wrapperRef} className={`${isIconSelecting ? "" : "invisible"} absolute overflow-y-auto top-10 w-[50vw] h-72 border-1 rounded-2xl p-3 bg-white flex flex-col z-20 font-robotoMono text-base`}>
        <p className="text-start text-xl font-semibold ms-2 mb-4">選擇 icon</p>
        <ul className="w-full flex flex-wrap">
            {iconList.map((icon) => (
            <li className="w-16 h-16 flex items-center justify-center cursor-pointer p-2 hover:bg-silver hover:border-1 hover:border-primary rounded-2xl" key={icon} onClick={() => setSelectedIcon(icon)}>
                <FeatherIcon icon={icon} width="32" height="32" strokeWidth="2"/>
            </li>
            ))}
        </ul>
        </div>
    )
}

export default IconSelector;
