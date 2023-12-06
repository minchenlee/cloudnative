export default function separateItemsByTime(items) {
  const timeGroups = {
    "08:00-12:00": [],
    "12:00-18:00": [],
    "18:00-22:00": []
  };

  items.forEach(item => {
    const startTime = item.startTime;
    if (startTime >= "08:00" && startTime < "12:00") {
      timeGroups["08:00-12:00"].push(item);
    } else if (startTime >= "12:00" && startTime < "18:00") {
      timeGroups["12:00-18:00"].push(item);
    } else if (startTime >= "18:00" && startTime <= "22:00") {
      timeGroups["18:00-22:00"].push(item);
    }
  });

  // Sort each group based on the startTime property of each item
  Object.keys(timeGroups).forEach(key => {
    timeGroups[key].sort((a, b) => {
      if (a.startTime < b.startTime) {
        return -1;
      }
      if (a.startTime > b.startTime) {
        return 1;
      }
      return 0;
    });
  });

  return timeGroups;
}
