import { useState } from "react"
import SportCard from "../components/cards/SportCard"

function BookingPage(){
  return(
    <div className="container mx-auto">
      <div className="px-24 w-full max-w-[1280px] mx-auto mt-16 mb-10 flex flex-col">
        <h1 className="text-2xl font-semibold text-center">要找什麼球場呢？</h1>
        <div className=" mt-16 grid grid-cols-3 grid-flow-row gap-5">
          <SportCard text="籃球 🏀" sport="basketball" bg="bg-basketball-card" link="/booking/basketball"/>
          <SportCard text="羽球 🏸" sport="badminton" bg="bg-badminton-card" link="/booking/badminton"/>
          <SportCard text="排球 🏐" sport="volleyball" bg="bg-volleyball-card" link="/booking/volleyball"/>
          <SportCard text="網球 🎾" sport="tennis" bg="bg-tennis-card" link="/booking/tennis"/>
          <SportCard text="桌球 🏓" sport="tabletennis" bg="bg-table-tennis-card" link="/booking/tabletennis"/>
        </div>
      </div>
    </div>
  )
}

export default BookingPage
