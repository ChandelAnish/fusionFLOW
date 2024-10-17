import './App.css'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import SideBar from './components/SideBar'
import { Outlet, useLoaderData } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { userDetailsSliceAction } from './store/UserDetails';

function App() {

  const dispatch = useDispatch()

  const userDetails = useLoaderData()
  dispatch(userDetailsSliceAction.getUserDetails(userDetails))

  return (
    <>
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

//loader function
export const getLoggedUserDetails = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/loggedUserDetails`, {
      credentials: "include"
    });
    const userDetails = await response.json();
    if (userDetails.signin === false) {
      window.open('https://fusionflow-signin.onrender.com', '_parent')
      return {};
    }
    delete userDetails.iat;
    return userDetails;
  } catch (error) {
    console.log("error occurred : ", error)
    return {};
  }
}
