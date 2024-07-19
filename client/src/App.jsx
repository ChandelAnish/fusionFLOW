import './App.css'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideBar from './components/SideBar'
import Footer from './components/Footer'
import SignIn from './auth/SignIn'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      {/* <SignIn /> */}
      <div className="app-container d-flex">
        <SideBar />
        <div className="content w-100">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default App
