import React, {useState, useEffect, useRef} from "react";
import useOutsideClick from "../../utilities/useOutsideClick";
import FeatherIcon from "feather-icons-react";
import iconList from "../../dummyJson/iconList";
import IconSelector from "./IconSelector";


// 基本資訊編輯時的 block
function BasicInfoEditBlock({editedData, setEditedData}){
  let description = editedData["description"];

  const onAdd = () => {
    description.push({icon: "plus-circle", content: "", id: Math.random().toString(36).substr(2, 9)});
    setEditedData(editedData => ({...editedData, description: description}));
  }

  return(
    <div className="flex flex-col gap-6 w-8/12">
      {editedData.description.map((item) => (
        <BasicInfoEditRow 
        key={item.id} 
        id={item.id} 
        icon={item.icon} 
        content={item.content} 
        editedData={editedData} 
        setEditedData={setEditedData}/>
      ))}
      <div className="flex flex-row items-center text-base ">
        <button 
        className="flex flex-row items-center justify-center w-full h-16 border-gray border-2 border-dashed rounded-xl text-base text-gray font-semibold font-robotoMono hover:bg-light-silver duration-300"
        onClick={onAdd}
        >
          新增資訊
          <FeatherIcon icon="plus-circle" width="24" height="24" strokeWidth="3" className="ms-2"/>
        </button>
      </div>
    </div>
  )
}


// 基本資訊編輯時的 row
function BasicInfoEditRow(props){
  const id = props.id || "";
  const icon = props.icon || "";
  const content = props.content || "";
  const editedData = props.editedData || "";
  const setEditedData = props.setEditedData || null;
  const [selectedIcon, setSelectedIcon] = useState(icon);
  const [isIconSelecting, setIsIconSelecting] = useState(false);
  
  // 當 input 改變時，更新 editedData，格式為 stadium Data
  const onEditInfo = (e) => {
    let newDescription = editedData["description"];
    let index = newDescription.findIndex(item => item.id === id);
    newDescription[index]["content"] = e.target.value;
    setEditedData(editedData => ({...editedData, description: newDescription}));
  }

  // 刪除此一基本資訊
  const onRemove = () => {
    // filter out the item with the same id
    let newDescription = editedData["description"].filter(item => item.id !== id);
    setEditedData(editedData => ({ ...editedData, description: newDescription }));
  }

  // 選擇 icon
  const onClickIcon = () => {
    setIsIconSelecting(!isIconSelecting);
  }

  // 當 icon 改變時，更新 editedData 
  useEffect(()=>{
    let description = editedData["description"];
    let index = description.findIndex(item => item.id === id);
    description[index]["icon"] = selectedIcon;
    setEditedData(editedData => ({...editedData, description: description}));
  }, [selectedIcon])


  return(
    <div className={`flex flex-row items-center text-base group`}>
      <button className="me-5 p-2 border-dashed border-1 rounded-xl hover:bg-light-silver relative" onClick={onClickIcon}>
        <FeatherIcon icon={selectedIcon} width="36" height="36" strokeWidth="2" className="text-dark-gray"/>
        <IconSelector 
        iconList={iconList} 
        defaultIcon={icon} 
        isIconSelecting={isIconSelecting} 
        setIsIconSelecting={setIsIconSelecting}
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
        />
      </button>
      <input 
      className={`w-[calc(100%-40px)] border-b-1 font-robotoMono focus:outline-none focus:ring-silver focus:ring-4`} 
      defaultValue={content}
      onChange={onEditInfo}
      />
      <button 
      className="group-hover:opacity-100 opacity-50 duration-200 flex items-center justify-center w-12 h-12 text-base text-gray"
      onClick={onRemove}
      >
        <FeatherIcon icon="trash-2" width="24" height="24" strokeWidth="3"/>
      </button>
    </div>
  )
}
  


export default BasicInfoEditBlock;