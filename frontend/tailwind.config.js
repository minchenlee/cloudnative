/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // important: '#root',
  theme: {
    fontFamily: {
      sansTC: ["Noto Sans TC"],
      robotoMono: ["Roboto Mono"]
    },
    fontSize: {
      sm: "0.875rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
    },
    extend: {
      colors: {
        "primary": "#292929",
        "white": "#FFFFFF",
        "black": "#000000",
        "light-silver": "#EEEEEE",
        "silver": "#CCCCCC",
        "gray": "#858585",
        "dark-gray": "#3F3F3F",
        "light-green": "#D3E59F",
        "peach": "#F4B092",
        "fade-blue":"#4D9F9E",
      },
      backgroundImage: {
        "blur-dot-bg": "url(../src/assets/blur-dot-bg.svg)",
        "basketball-card": "url(../src/assets/image/basketball_bg.jpg)",
        "badminton-card": "url(../src/assets/image/badminton_bg.jpg)",
        "volleyball-card": "url(../src/assets/image/volleyball_bg.jpg)",
        "tennis-card": "url(../src/assets/image/tennis_bg.jpg)",
        "table-tennis-card": "url(../src/assets/image/table_tennis_bg.jpg)",
        "court-recruit-card": "url(../src/assets/image/court_recruit_bg.jpg)",
        "court-join-card": "url(../src/assets/image/court_join_bg.jpg)",
        "booking-success-bg": "url(../src/assets/image/booking_success.jpg)",
        "login-bg": "url(../src/assets/admin_login_bg.svg)",
        "default-court-basketball": "url(../src/assets/image/default_court_basketball.png)",
        "default-court-badminton": "url(../src/assets/image/default_court_badminton.png)",
        "default-court-tennis": "url(../src/assets/image/default_court_tennis.png)",
        "default-court-volleyball": "url(../src/assets/image/default_court_volleyball.png)",
        "default-court-tabletennis": "url(../src/assets/image/default_court_tabletennis.png)",
      },
      backgroundSize: {
        '110': '110%',
      },
      backdropContrast: {
        110: "1.1",
      },
      scale: {
        '101': '1.01',
      },
      borderWidth: {
        '1': '1px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}