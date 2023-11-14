const dummyJson = [
  {
    "id": 1,
    "courtName": "球場 A",
    "timeList": [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00"
    ],
    "notAvailableList": [
      "08:00",
      "09:00"
    ]
  },
  {
    "id": 2,
    "courtName": "球場 B",
    "timeList": [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00"
    ],
    "notAvailableList": [
      "10:00",
      "14:00",
      "16:00"
    ]
  },
  {
    "id": 3,
    "courtName": "球場 C",
    "timeList": [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00"
    ],
    "notAvailableList": [
      "12:00",
      "17:00",
      "22:00"
    ]
  },
  {
    "id": 4,
    "courtName": "球場 D",
    "timeList": [
      "08:00",
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
      "23:00"
    ],
    "notAvailableList": [
      "08:00",
      "11:00",
      "19:00"
    ]
  }
]


const dummyJson4StadiumData = [
  {
    "name": "籃球場1",
    "img_url": "../src/assets/image/新生籃球場.jpg",
    "inOrOut": "室內",
    "numberOfCourts": 4,
    "weekStatus": {
      "Sun": {
        "morning": "plenty",
        "afternoon": "some",
        "evening": "none"
      },
      "Mon": {
        "morning": "none",
        "afternoon": "plenty",
        "evening": "some"
      },
      "Tue": {
        "morning": "some",
        "afternoon": "none",
        "evening": "plenty"
      },
      "Wed": {
        "morning": "plenty",
        "afternoon": "some",
        "evening": "none"
      },
      "Thu": {
        "morning": "none",
        "afternoon": "plenty",
        "evening": "some"
      },
      "Fri": {
        "morning": "some",
        "afternoon": "none",
        "evening": "plenty"
      },
      "Sat": {
        "morning": "plenty",
        "afternoon": "some",
        "evening": "none"
      }
    }
  },
  {
    "name": "籃球場2",
    "img_url": "../src/assets/image/新生籃球場.jpg",
    "inOrOut": "室外",
    "numberOfCourts": 3,
    "weekStatus": {
      "Sun": {
        "morning": "none",
        "afternoon": "plenty",
        "evening": "some"
      },
      "Mon": {
        "morning": "some",
        "afternoon": "none",
        "evening": "plenty"
      },
      "Tue": {
        "morning": "plenty",
        "afternoon": "some",
        "evening": "none"
      },
      "Wed": {
        "morning": "plenty",
        "afternoon": "none",
        "evening": "some"
      },
      "Thu": {
        "morning": "some",
        "afternoon": "none",
        "evening": "plenty"
      },
      "Fri": {
        "morning": "none",
        "afternoon": "plenty",
        "evening": "some"
      },
      "Sat": {
        "morning": "plenty",
        "afternoon": "some",
        "evening": "none"
      }
    }
  },
  {
    "name": "籃球場3",
    "img_url": "../src/assets/image/新生籃球場.jpg",
    "inOrOut": "室內",
    "numberOfCourts": 6,
    "weekStatus": {
      "Sun": {
        "morning": "some",
        "afternoon": "none",
        "evening": "plenty"
      },
      "Mon": {
        "morning": "plenty",
        "afternoon": "none",
        "evening": "some"
      },
      "Tue": {
        "morning": "none",
        "afternoon": "plenty",
        "evening": "some"
      },
      "Wed": {
        "morning": "plenty",
        "afternoon": "some",
        "evening": "none"
      },
      "Thu": {
        "morning": "none",
        "afternoon": "plenty",
        "evening": "some"
      },
      "Fri": {
        "morning": "some",
        "afternoon": "none",
        "evening": "plenty"
      },
      "Sat": {
        "morning": "plenty",
        "afternoon": "some",
        "evening": "none"
      }
    }
  },
  {
    "name": "籃球場4",
    "img_url": "../src/assets/image/新生籃球場.jpg",
    "inOrOut": "室外",
    "numberOfCourts": 2,
    "weekStatus": {
      "Sun": {
        "morning": "plenty",
        "afternoon": "some",
        "evening": "none"
      },
      "Mon": {
        "morning": "none",
        "afternoon": "plenty",
        "evening": "some"
      },
      "Tue": {
        "morning": "some",
        "afternoon": "none",
        "evening": "plenty"
      },
      "Wed": {
        "morning": "plenty",
        "afternoon": "none",
        "evening": "some"
      },
      "Thu": {
        "morning": "some",
        "afternoon": "none",
        "evening": "plenty"
      },
      "Fri": {
        "morning": "none",
        "afternoon": "plenty",
        "evening": "some"
      },
      "Sat": {
        "morning": "plenty",
        "afternoon": "some",
        "evening": "none"
      }
    }
  },
  {
    "name": "籃球場5",
    "img_url": "../src/assets/image/新生籃球場.jpg",
    "inOrOut": "室內",
    "numberOfCourts": 7,
    "weekStatus": {
      "Sun": {
        "morning": "none",
        "afternoon": "plenty",
        "evening": "some"
      },
      "Mon": {
        "morning": "some",
        "afternoon": "none",
        "evening": "plenty"
      },
      "Tue": {
        "morning": "plenty",
        "afternoon": "some",
        "evening": "none"
      },
      "Wed": {
        "morning": "none",
        "afternoon": "plenty",
        "evening": "some"
      },
      "Thu": {
        "morning": "some",
        "afternoon": "none",
        "evening": "plenty"
      },
      "Fri": {
        "morning": "plenty",
        "afternoon": "none",
        "evening": "some"
      },
      "Sat": {
        "morning": "none",
        "afternoon": "plenty",
        "evening": "some"
      }
    }
  }
]





// dummy json for booking detail page
const dummyJson4BookingDetail = [
  {
    "id": 1,
    "stadiumName": "新生籃球場",
    "stadiumImage": "",
    "stadiumPosition": [25.019372275640205, 121.53595279647551],
    "stadiumInfo": [
      {
        "icon": "map-pin",
        "content": "新生一、二籃球場位於網球場及新生車道入口旁"
      },
      {
        "icon": "sun",
        "content": "週一至六提供夜間照明至晚上10點, 週日無提供夜間照明"
      },
      {
        "icon": "cloud-rain",
        "content": "遇雨或場地濕滑暫停使用"
      },
      {
        "icon": "info",
        "content": "新生三籃球場亦為女性優先球場, 以女性球友優先使用"
      },
      {
        "icon": "clock",
        "content": "開放時間：週一至週六 08:00-22:00，週日 08:00-18:00"
      },
      {
        "icon": "dollar-sign",
        "content": "收費標準：平日 50 元/小時，假日 100 元/小時"
      },
      {
        "icon": "phone",
        "content": "聯絡電話：02-12345678"
      }
    ],
    
    "courtInfo": [
      {
        "id": 1,
        "courtName": "球場 A",
        "timeList": [
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00"
        ],
        "notAvailableList": [
          "08:00",
          "09:00"
        ]
      },
      {
        "id": 2,
        "courtName": "球場 B",
        "timeList": [
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00"
        ],
        "notAvailableList": [
          "10:00",
          "14:00",
          "16:00"
        ]
      },
      {
        "id": 3,
        "courtName": "球場 C",
        "timeList": [
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00"
        ],
        "notAvailableList": [
          "12:00",
          "17:00",
          "22:00"
        ]
      },
      {
        "id": 4,
        "courtName": "球場 D",
        "timeList": [
          "08:00",
          "09:00",
          "10:00",
          "11:00",
          "12:00",
          "13:00",
          "14:00",
          "15:00",
          "16:00",
          "17:00",
          "18:00",
          "19:00",
          "20:00",
          "21:00",
          "22:00",
          "23:00"
        ],
        "notAvailableList": [
          "08:00",
          "11:00",
          "19:00"
        ]
      }
    ]
  },
  {
    "id": 2,
    "stadiumName": "中山籃球場",
    "stadiumPosition": [25.022591, 121.538274],
    "stadiumInfo": [
        {
            "icon": "map-pin",
            "content": "中山籃球場位於市中心，交通便利"
        },
        {
            "icon": "sun",
            "content": "週一至週五提供夜間照明至晚上9點，週末無提供夜間照明"
        },
        {
            "icon": "cloud-rain",
            "content": "遇雨或場地濕滑暫停使用"
        },
        {
            "icon": "info",
            "content": "中山籃球場歡迎所有球友使用"
        },
        {
            "icon": "clock",
            "content": "開放時間：週一至週五 09:00-21:00，週末 09:00-18:00"
        },
        {
            "icon": "dollar-sign",
            "content": "收費標準：平日 40 元/小時，假日 60 元/小時"
        },
        {
            "icon": "phone",
            "content": "聯絡電話：02-98765432"
        }
    ],
    "courtInfo": [
        {
            "id": 1,
            "courtName": "球場 A",
            "timeList": [
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00"
            ],
            "notAvailableList": []
        },
        {
            "id": 2,
            "courtName": "球場 B",
            "timeList": [
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00"
            ],
            "notAvailableList": ["12:00", "16:00"]
        },
        {
            "id": 3,
            "courtName": "球場 C",
            "timeList": [
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00"
            ],
            "notAvailableList": ["09:00", "18:00", "21:00"]
        },
    ]
  },
  {
    "id": 3,
    "stadiumName": "市民籃球場",
    "stadiumPosition": [25.017843, 121.532167],
    "stadiumInfo": [
        {
            "icon": "map-pin",
            "content": "市民籃球場位於市中心公園，環境優美"
        },
        {
            "icon": "sun",
            "content": "週一至週六提供夜間照明至晚上10點，週日無提供夜間照明"
        },
        {
            "icon": "cloud-rain",
            "content": "遇雨或場地濕滑暫停使用"
        },
        {
            "icon": "info",
            "content": "市民籃球場歡迎所有居民使用"
        },
        {
            "icon": "clock",
            "content": "開放時間：週一至週六 08:00-22:00，週日 08:00-18:00"
        },
        {
            "icon": "dollar-sign",
            "content": "收費標準：平日 30 元/小時，假日 50 元/小時"
        },
        {
            "icon": "phone",
            "content": "聯絡電話：02-87654321"
        }
    ],
    "courtInfo": [
        {
            "id": 1,
            "courtName": "球場 A",
            "timeList": [
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00"
            ],
            "notAvailableList": ["08:00", "09:00"]
        },
        {
            "id": 2,
            "courtName": "球場 B",
            "timeList": [
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00"
            ],
            "notAvailableList": ["10:00", "14:00", "16:00"]
        },
        {
            "id": 3,
            "courtName": "球場 C",
            "timeList": [
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00"
            ],
            "notAvailableList": ["12:00", "17:00", "22:00"]
        },
        {
            "id": 4,
            "courtName": "球場 D",
            "timeList": [
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00"
            ],
            "notAvailableList": ["08:00", "11:00", "19:00"]
        }
    ]
  },
  {
    "id": 4,
    "stadiumName": "台北市立體育館",
    "stadiumPosition": [25.024706, 121.540899],
    "stadiumInfo": [
        {
            "icon": "map-pin",
            "content": "台北市立體育館位於信義區，交通方便"
        },
        {
            "icon": "sun",
            "content": "週一至週六提供夜間照明至晚上10點，週日無提供夜間照明"
        },
        {
            "icon": "cloud-rain",
            "content": "遇雨或場地濕滑暫停使用"
        },
        {
            "icon": "info",
            "content": "台北市立體育館歡迎各類體育活動"
        },
        {
            "icon": "clock",
            "content": "開放時間：週一至週六 08:00-22:00，週日 08:00-18:00"
        },
        {
            "icon": "dollar-sign",
            "content": "收費標準：平日 60 元/小時，假日 80 元/小時"
        },
        {
            "icon": "phone",
            "content": "聯絡電話：02-34567890"
        }
    ],
    "courtInfo": [
        {
            "id": 1,
            "courtName": "球場 A",
            "timeList": [
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00"
            ],
            "notAvailableList": []
        },
        {
            "id": 2,
            "courtName": "球場 B",
            "timeList": [
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00"
            ],
            "notAvailableList": ["10:00", "14:00", "16:00"]
        },
        {
            "id": 3,
            "courtName": "球場 C",
            "timeList": [
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00"
            ],
            "notAvailableList": ["12:00", "17:00", "22:00"]
        },
        {
            "id": 4,
            "courtName": "球場 D",
            "timeList": [
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00"
            ],
            "notAvailableList": ["08:00", "11:00", "19:00"]
        }
    ]
  }
]




export {dummyJson, dummyJson4StadiumData, dummyJson4BookingDetail};