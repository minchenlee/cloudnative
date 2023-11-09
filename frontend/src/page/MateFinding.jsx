import { useState } from "react"
import MateFindingCard from "../components/cards/MateFindingCard"
import BookingQuickButton from "../components/buttons/BookingQuickButton"

function MateFindingPage(){
  return(
    <div className="container">
      <div className="px-48 w-screen mt-16 flex flex-col">
        <h1 className="text-2xl font-semibold text-center">嘿！有預約球場了嘛？</h1>
        <div className=" mt-16 px-10 flex justify-between">
          <MateFindingCard text="已有預約球場" secondText="招募球友" bg="bg-court-recruit-card" link="/findmate/recruit"/>
          <MateFindingCard text="沒有預約球場" secondText="報名" bg="bg-court-join-card" link="/findmate/join"/>
        </div>
        <div className="pt-10 flex justify-center">
          <BookingQuickButton/>
        </div>
      </div>
    </div>
  )
}

export default MateFindingPage
