import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Profile from './pages/Profile.jsx';
import EditProfile from "./pages/EditProfile";
import Clubs from "./pages/Clubs";
import SignIn from './pages/Authentication/SignInTeach';
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
              <PageTitle title="Clubs | Faculty Dashboard" />
              <Clubs />
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
      </Routes>
    </>
  );
}

export default App;