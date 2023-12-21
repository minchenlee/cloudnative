import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Header from '../components/Header'

// ScrollToTop is a component that will scroll to top when the route changes
import ScrollToTop from "../utilities/ScrollToTop";

function Layout() {
  return(
    <>
      <ScrollToTop />
      <Header />
      <Toaster 
        toastOptions={{
          className: 'text-sm py-1 font-primary font-semibold border-1 shadow-md text-color-primary',
      }}
      />
      <Outlet />
    </>
  )
}

export default Layout
