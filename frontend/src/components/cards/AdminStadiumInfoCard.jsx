import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useOutsideClick from "../../utilities/useOutsideClick";
import TimeSelector from "../input/TimeSelector";
import iconList from "../../dummyJson/iconList";
import RowEditSelector from "../input/RowEditSelector";
import BasicInfoEditBlock from "../input/BasicInfoEditBlock";
import codeSportConverter  from "../../utilities/codeSportConverter.jsx"

// 引入 Modal
import Modal from "../modals/Modal";
import AllContext from "../../contexts/AllContext";

import FeatherIcon from 'feather-icons-react';
import Cropper from 'react-easy-crop'
import ImageUploading from 'react-images-uploading';


// main component
function AdminStadiumInfoCard(props){
  // const [editedData, setEditedData] = useState(props.data || []);
  const stadiumData = props.stadiumData || [];
  const editedData = props.editedData || [];
  const setEditedData = props.setEditedData || setEditedData;
  const isEditing = props.isEditing || false;

  // for BasicInfoBlock and BasicInfoEditBlock
  const description = stadiumData.description || [];
  const location = stadiumData.location || {};
  const contactInfo = stadiumData.contactInfo || {};

  // for ImageEditBlock
  const images = props.images || [];
  const setImages = props.setImages || null;

  // 控制 Modal
  const {isModalOpen, setIsModalOpen} = useContext(AllContext);
  
  // 當 editedData 改變時，console 出來
  // useEffect(()=>{
  //   console.log("editedData: ", editedData);
  // }, [editedData])

  if (isEditing){
    return(
      <div className="flex flex-col gap-7 mt-6">
        <Row
        title="場地名稱"
        children={
          <input 
          className={`w-64 border-b-1 text-base focus:outline-none focus:ring-silver focus:ring-4`} 
          defaultValue={stadiumData.name}
          onChange={(e)=>{
            setEditedData(editedData => ({...editedData, name: e.target.value}));
          }}
          />
        }
        align="items-center"
        />
        <Row 
        title="室內／外" 
        children={
          <RowEditSelector
          target="isIndoor"
          optionList={["室內", "室外"]}
          editedData={editedData}
          setEditedData={setEditedData}
          />
        }
        align="items-center"
        />
        <Row 
        title="場地類型" 
        children={
          <RowEditSelector
          target="sport"
          optionList={["籃球", "羽球", "排球", "網球", "桌球"]}
          editedData={editedData}
          setEditedData={setEditedData}
          />
        }
        align="items-center"
        />
        <Row
        title="開放時間"
        children={
          <TimeSelector
          editedData={editedData}
          setEditedData={setEditedData}
          />
        }
        align="items-center"
        />
        <Row 
        title="必要資訊" 
        children={
          <NeccessaryInfoEditBlock 
          location={location} 
          contactInfo={contactInfo}
          editedData={editedData}
          setEditedData={setEditedData}
          />
        }
        />
        <Row 
        title="基本資訊" 
        children={
          <BasicInfoEditBlock 
          editedData={editedData}
          setEditedData={setEditedData}
          />
        }
        />
        <Row
        title="場地照片"
        children={
          <ImageEditBlock
          images={images}
          setImages={setImages}
          />
        }
        />
        <Modal 
        title={"裁切照片"}
        showClose={false}
        width="50rem" height="34rem"
        isModalOpen={isModalOpen} 
        setIsModalOpen={setIsModalOpen}
        children={
          <ImageCropModal 
          images={images}
          setImages={setImages}
          />
        }
        />
      </div>
    )
  }
  if (!stadiumData.time) {
    return;
  }
  return(
    <div className="flex flex-col gap-7 mt-6">
      <Row title="場地名稱" content={stadiumData.name} align="items-center"/>
      <Row title="室內／外" content={stadiumData.isIndoor ? "室內" : "室外"} align="items-center"/>
      <Row title="場地類型" content={codeSportConverter(stadiumData.sport)} align="items-center"/>
      <Row title="開放時間" content={`${stadiumData.time.openTime} - ${stadiumData.time.closeTime}`} align="items-center"/>
      <Row title="必要資訊" children={<NeccessaryInfoBlock location={location} contactInfo={contactInfo} />}/>
      <Row title="基本資訊" children={<BasicInfoBlock data={description}/>}/>
      <Row title="場地照片" children={<ImageBlock/>}/>
    </div>
  )
}


// 必要資訊的 block
function NeccessaryInfoBlock(props){
  const location = props.location || {};
  const contactInfo = props.contactInfo || {};
  const address = location.address || "";
  const tel = contactInfo.tel || "";
  const data = [
    {icon: "map", content: address},
    {icon: "phone", content: tel},
  ]

  return(
    <div className="flex flex-col gap-6 w-8/12">
      { data.map((item, index) => (
        <BasicInfoRow key={index} icon={item.icon} content={item.content}/>
      ))}
    </div>
  )
}


function NeccessaryInfoEditRow(props){
  const editedData = props.editedData || [];
  const setEditedData = props.setEditedData || null;
  const icon = props.icon || "";
  const content = props.content || "";
  const onEditInfo = (e) => {
    let newLocation = editedData["location"];
    let newContactInfo = editedData["contactInfo"];

    if (icon === "map"){
      newLocation["address"] = e.target.value;
      setEditedData(editedData => ({...editedData, location: newLocation}));
    } else if (icon === "phone"){
      newContactInfo["tel"] = e.target.value;
      setEditedData(editedData => ({...editedData, contactInfo: newContactInfo}));
    }
  }

  return(
    <div className={`flex flex-row items-center text-base group`}>
      <div className="me-5 p-2 relative">
        <FeatherIcon icon={icon} width="36" height="36" strokeWidth="2" className="text-dark-gray"/>
      </div>
      <input 
      className={`w-[calc(100%-40px)] border-b-1 font-robotoMono focus:outline-none focus:ring-silver focus:ring-4`} 
      defaultValue={content}
      onChange={onEditInfo}
      />
  </div>
  )
}

//
function NeccessaryInfoEditBlock(props){
  const editedData = props.editedData || [];
  const setEditedData = props.setEditedData || null;
  const location = props.location || {};
  const contactInfo = props.contactInfo || {};
  const address = location.address || "";
  const tel = contactInfo.tel || "";

  const data = [
    {icon: "map", content: address},
    {icon: "phone", content: tel},
  ]

  return(
    <div className="flex flex-col gap-6 w-8/12">
      { data.map((item, index) => (
        <NeccessaryInfoEditRow key={index} icon={item.icon} content={item.content} editedData={editedData} setEditedData={setEditedData}/>
      ))}
    </div>
  )
}


// 基本資訊的 row
function BasicInfoRow(props){
  const icon = props.icon || "";
  const content = props.content || "";
  return(
    <div className="flex flex-row items-center text-base cursor-default">
      <FeatherIcon icon={icon} width="36" height="36" strokeWidth="2" className="text-dark-gray me-5"/>
      <p className={`w-full font-robotoMono`}>
        {content}
      </p>
    </div>
  )
}

// 基本資訊的 block
function BasicInfoBlock({data}){
  return(
    <div className="flex flex-col gap-6 w-8/12">
      { data.map((item, index) => (
        <BasicInfoRow key={index} icon={item.icon} content={item.content}/>
      ))}
    </div>
  )
}

function ImageBlock(){
  return(
    <div className="flex flex-row gap-6 w-8/12">
      <img src="../../src/assets/image/新生籃球場.jpg" alt="" className="w-[340px] h-[192px] rounded-3xl"/>
    </div>
  )
}

function ImageEditBlock(props){
  const {isModalOpen, setIsModalOpen} = useContext(AllContext);
  const images = props.images || [];
  const setImages = props.setImages || null;
  const maxNumber = 1;

  const onChange = (imageList) => {
    // data for submit
    setImages(imageList);

    if (imageList.length > 0){
      setIsModalOpen(true);
    }
  };

  // 確認 images 是否有改變
  // useEffect(()=>{
  //   console.log(images)
  // }, [images])
  
  return(
    <div className="flex flex-col xl:flex-row gap-4 w-8/12 ">
      { images.length === 0 && (
        <div className="flex flex-col">
          <img src="../../src/assets/image/新生籃球場.jpg" alt="" className="w-[340px] h-[192px] rounded-3xl"/>
          {/* <p className="text-base text-center mt-2">當前使用照片</p> */}
        </div>
      )}
      <div className="flex flex-col">
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps,
          }) => (
            // write your building UI
            <div className="relative group">
              <button
              className="w-[340px] h-[192px] rounded-3xl border-2 border-dashed bg-light-silver flex items-center justify-center gap-3 text-gray overflow-hidden"
              onClick={onImageUpload}
              {...dragProps}
              >
                {imageList.length === 0 && (
                <>
                  <p className="text-xl font-semibold">更換照片</p>
                  <FeatherIcon icon="image" width="36" height="36" strokeWidth="2" className=""/>
                </>
                )}
                
                {imageList.length > 0 && (
                  <img className="w-full h-full" src={imageList[0]['data_url']} alt="" width="100"/>
                )}
              </button>
              {imageList.length > 0 && (
                <button
                className="absolute w-full h-full top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 z-10 group-hover:opacity-100 opacity-0 duration-300 flex items-center justify-center text-base text-white gap-4 backdrop-blur-sm bg-black bg-opacity-30 rounded-3xl"
                onClick={() => onImageRemove(0)}
                >
                  <FeatherIcon icon="rotate-cw" width="32" height="32" strokeWidth="3"/>
                  <p className="text-xl font-semibold">重置</p>
                </button>
              )}
            </div>
          )}
        </ImageUploading>
        {/* <p className="text-base text-center mt-2">替換照片</p> */}
      </div>
    </div>
  )
}


function ImageCropModal(props){
  const {isModalOpen, setIsModalOpen} = useContext(AllContext);
  const images = props.images || [];
  const setImages = props.setImages || null;

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [cropInfo, setCropInfo] = useState({})

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    // console.log(croppedArea, croppedAreaPixels)
    setCropInfo(croppedAreaPixels);
  }

  const onConfirm = async(imageSrc, pixelCrop) => {
    const imgData = await getCroppedImg(imageSrc, pixelCrop);
    setImages([imgData]);
    setIsModalOpen(false);
  }

  // 處理 image 的點擊
  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Image load error'));
      img.src = src;
    });
  }

  const getCroppedImg = async(imageSrc, pixelCrop) => {
    const image = await loadImage(imageSrc);
    const canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(image, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height);
  
    return new Promise((resolve, reject) => {
      // Get the data URL
      const data_url = canvas.toDataURL('image/jpeg');
  
      // Get the blob/file
      canvas.toBlob(blob => {
        if (blob) {
          // Create a file from the blob
          const file = new File([blob], "cropped.jpg", { type: 'image/jpeg' });
  
          resolve({ data_url, file });
        } else {
          reject(new Error('Canvas is empty'));
        }
      }, 'image/jpeg');
    });
  }  

  if (images.length === 0){
    return
  }

  return(
  <div className="w-full h-full flex flex-col">
    <div className="relative w-full h-4/5">
      <Cropper
        image={images[0]['data_url']}
        crop={crop}
        zoom={zoom}
        aspect={85 / 48}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onZoomChange={setZoom}
      />
    </div>
    <div className="flex items-center justify-center h-1/5">
      <button 
      className="w-32 h-10 rounded-full border-1 hover:bg-light-silver"
      onClick={()=>onConfirm(images[0]['data_url'], cropInfo)}
      >
        確認
      </button>
    </div>
    {/* <div className="absolute bottom-5 left-1/2 w-1/2 transform -translate-x-1/2 flex items-center">
      <input
        type="range"
        value={zoom}
        min={1}
        max={3}
        step={0.1}
        aria-labelledby="Zoom"
        onChange={(e) => {
          setZoom(e.target.value)
        }}
        className="w-full h-2 bg-blue-500 appearance-none"
      />
    </div> */}
  </div>
  )
}


function Row(props){
  const align = props.align || "items-start";
  const title = props.title || "";
  const content = props.content || "";
  const children = props.children || null;

  return(
    <div className={`flex flex-row ${align} text-xl`}>
      <p className="h-full w-32 font-semibold">{title}</p>
      {children 
      ? 
      children 
      :
      <p className={`text-base w-8/12 font-robotoMono`}>{content}</p>
      }
    </div>
  )
}



export default AdminStadiumInfoCard;