import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader/index.jsx';
import PageTitle from './components/PageTitle.js';
import Profile from './pages/Profile.jsx';
import EditProfile from "./pages/EditProfile.jsx";
import Clubs from "./pages/Clubs.jsx";
import SignIn from './pages/Authentication/SignInTeach.jsx';
import Forgot from './pages/Authentication/Forgot.jsx';
import VerifyOTP from './pages/Authentication/VerifyOTP.jsx';
import Reset from './pages/Authentication/Reset.jsx';
import ClubsPage from './pages/ClubsPage.jsx';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageTitle title="Profile | Faculty Dashboard" />
              <Profile />
            </>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <>
              <PageTitle title="Edit-Profile | Faculty Dashboard" />
              <EditProfile />
            </>
          }
        />
        <Route
          path="/clubs"
          element={
            <>
              <PageTitle title="Clubs | Clubs Dashboard" />
              <Clubs />
            </>
          }
        />
        <Route
          path="/clubs/:name"
          element={
            <>
              <PageTitle title="Clubs-Page | Clubs Dashboard" />
              <ClubsPage />
            </>
          }
        />
        <Route
        path='/auth/signin'
        element={
          <>
          <PageTitle title='Authentication | Faculty Login'/>
          <SignIn/>
          </>
        }/>
        <Route
        path='/forgot'
        element={
          <>
          <PageTitle title='Reset Password | Faculty Login'/>
          <Forgot />
          </>
        }/>
        <Route
        path='/verifyOTP'
        element={
          <>
          <PageTitle title='Verify OTP | Faculty Login'/>
          <VerifyOTP />
          </>
        }/>
        <Route
        path='/reset'
        element={
          <>
          <PageTitle title='Reset Password | Faculty Login'/>
          <Reset />
          </>
        }/>
      </Routes>
    </>
  );
}

export default App;