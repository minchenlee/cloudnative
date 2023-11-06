// 將星期幾的名稱轉換成代號
function dayToDayCode(day) {
  const dayToCode = {
    "sun": 0,
    "mon": 1,
    "tue": 2,
    "wen": 3,
    "thu": 4,
    "fri": 5,
    "sat": 6,
  }
  return dayToCode[day];
}

// 將代號轉換成星期幾的名稱
function dayCodeToDay(dayCode) {
  const codeToDay = {
    0: "sun",
    1: "mon",
    2: "tue",
    3: "wen",
    4: "thu",
    5: "fri",
    6: "sat",
  }
  return codeToDay[dayCode];
}

// 將代號轉換成中文的星期幾
function dayCodeToChineseDay(dayCode) {
  const codeToChineseDay = {
    0: "星期日",
    1: "星期一",
    2: "星期二",
    3: "星期三",
    4: "星期四",
    5: "星期五",
    6: "星期六",
  }
  return codeToChineseDay[dayCode];
}

export { dayToDayCode, dayCodeToDay, dayCodeToChineseDay };
