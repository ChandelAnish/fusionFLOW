import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { getLoggedUserDetails } from './App.jsx'
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
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query'

// Create a query client
const queryClient = new QueryClient(
  // {
  //   defaultOptions: {
  //     queries: {
  //       // staleTime:Infinity //data is never considered stale
  //       staleTime: 5000
  //     }
  //   }
  // }
)

const router = createBrowserRouter([
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/',
    element: <App />,
    loader: getLoggedUserDetails,
    children: [
      { path: '/', element: <Blurbs /> },
      { path: '/chat', element: <Chat /> },
      { path: '/videocall', element: <VideoCall /> },
      { path: '/expenses', element: <Expenses /> },
      { path: '/email', element: <Email /> },
      { path: '/spot', element: <Spot /> }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>

    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>

  </QueryClientProvider>

)