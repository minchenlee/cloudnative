import { Outlet } from "react-router-dom";
import Header from '../components/Header'

// ScrollToTop is a component that will scroll to top when the route changes
import ScrollToTop from "../utilities/ScrollToTop";

function Layout() {
  return(
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
    </>
  )
}

export default Layout
