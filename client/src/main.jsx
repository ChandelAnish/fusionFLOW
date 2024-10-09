import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App, { getLoggedUserDetails } from './App.jsx';
import { Provider } from 'react-redux';
import store from './store/index.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Blurbs from './routes/Blurbs.jsx';
import Chat from './routes/Chat.jsx';
import Expenses from './routes/Expenses.jsx';
import Email from './routes/Email.jsx';
import Spot from './routes/Spot.jsx';
import VideoCall from './routes/VideoCall.jsx';
import SignIn from './auth/SignIn.jsx';
import SignUp from './auth/SignUp.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import OTP from './auth/OTP.jsx';

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
);

const AppRoot = () => {
  const [otp, setOtp] = useState();

  const router = createBrowserRouter([
    { path: '/signin', element: <SignIn  /> },
    { path: '/signup', element: <SignUp setOtp={setOtp}/> },
    { path: '/otp', element: <OTP otp={otp} /> },
    {
      path: '/',
      element: <App />,
      loader: getLoggedUserDetails,
      children: [
        { path: '/', element: <Blurbs /> },
        { path: '/chat', element: <Chat /> },
        { path: '/expenses', element: <Expenses /> },
        { path: '/email', element: <Email /> },
        { path: '/spot', element: <Spot /> },
        // Add more routes as needed
      ]
    }
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<AppRoot />);
