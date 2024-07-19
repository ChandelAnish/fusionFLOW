import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Blurbs from './routes/Blurbs.jsx'
import Chat from './routes/Chat.jsx'
import Expenses from './routes/Expenses.jsx'
import Email from './routes/Email.jsx'
import Spot from './routes/Spot.jsx'
import VideoCall from './routes/VideoCall.jsx'
import SignIn from './auth/SignIn.jsx'
import SignUp from './auth/SignUp.jsx'

const router = createBrowserRouter([
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/',
    element: <App />,
    children: [
      {path: '/', element: <Blurbs />},
      {path: '/chat', element: <Chat />},
      {path: '/videocall', element: <VideoCall />},
      {path: '/expenses', element: <Expenses/>},
      {path: '/email', element: <Email/>},
      {path: '/spot', element: <Spot/>}
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        </RouterProvider>
    </Provider>
  </React.StrictMode>,
)