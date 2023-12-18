function codeSportConverter(sportCode){
    const codeSport = {
      BASKETBALL: "籃球",
      BADMINTON: "羽球",
      VOLLEYBALL: "排球",
      TENNIS: "網球",
      TABLETENNIS: "桌球",
      籃球: "BASKETBALL",
      羽球: "BADMINTON",
      排球: "VOLLEYBALL",
      網球: "TENNIS",
      桌球: "TABLETENNIS"
    }
    return codeSport[sportCode]
}

export default codeSportConverter