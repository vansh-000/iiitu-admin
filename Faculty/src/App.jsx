import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader/index.jsx';
import PageTitle from './components/PageTitle.jsx';
import Profile from './pages/Profile.jsx';
// import EditProfile from "./pages/EditProfile.jsx";
import SignIn from './pages/Authentication/SignInTeach.jsx';
import Forgot from './pages/Authentication/Forgot.jsx';
import VerifyOTP from './pages/Authentication/VerifyOTP.jsx';
import Reset from './pages/Authentication/Reset.jsx';
import Events from './pages/components/Events/Events.jsx';
import EventsPage from './pages/components/Events/EventsPage.jsx';
import PublicationEdit from './pages/components/PublicationType/PublicationEdit.jsx';
import ProjectEdit from './pages/components/Project/ProjectEdit.jsx';
// import ErrorBoundary from './ErrorBoundary.jsx'
function App() {
  const [loading, setLoading] = useState(true);
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
              <PageTitle title="Authentication | Faculty Login" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <PageTitle title="Profile | Faculty Dashboard" />
              
              <Profile />
            </>
          }
        />
        <Route
        path='/dashboard/publication/:id'
        element={<>
          <PageTitle title="Publication-Edit | Faculty Dashboard"/>
        
          <PublicationEdit/>
         
          </>
        }/>
        <Route
        path='/dashboard/Project/:id'
        element={<>
          <PageTitle title="Project-Edit | Faculty Dashboard"/>
          <ProjectEdit/>
          </>
        }/>
     <Route
          path="/events/:id"
          element={
            <>
              <PageTitle title="Events-Page | Events Dashboard" />
              <EventsPage/>
            </>
          }
        />
        <Route
          path="/events"
          element={
            <>
              <PageTitle title="Events | Events Dashboard" />
              <Events />
            </>
          }
        />
        {/* <Route
          path="/edit-profile"
          element={
            <>
              <PageTitle title="Edit-Profile | Faculty Dashboard" />
              <EditProfile />
            </>
          }
        /> */}
        <Route
          path="/forgot"
          element={
            <>
              <PageTitle title="Reset Password | Faculty Login" />
              <Forgot />
            </>
          }
        />
        <Route
          path="/verifyOTP"
          element={
            <>
              <PageTitle title="Verify OTP | Faculty Login" />
              <VerifyOTP />
            </>
          }
        />
        <Route
          path="/reset"
          element={
            <>
              <PageTitle title="Reset Password | Faculty Login" />
              <Reset />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;