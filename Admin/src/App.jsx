import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Gallery from './pages/Gallery';
import News from './pages/News';
import Events from './pages/Events';
import Curriculum from './pages/Curriculum';
import Tender from './pages/Tender/Tender';
import TenderEdits from './pages/Tender/TenderEdits';
import AddRecruitments from './pages/Recruitments/AddRecruitments';
import RecruitmentEdits from './pages/Recruitments/EditRecruitment';
import FacultyAdd from './pages/Faculty/FacultyAdd';
import FacultyEdit from './pages/Faculty/FacultyEdit';
import FacultyAllEdit from './pages/Faculty/FacultyAllEdit';
import Admissions from './pages/Admissions';
import SignupAdmin from './pages/Authentication/SignupAdmin';
import Clubs from './pages/Clubs';
import ClubsPage from './pages/ClubsPage';
import PrintMedia from './pages/PrintMedia';
import EventsPage from './pages/EventsPage';
import CurriculumPage from './pages/CurriculumPage.jsx';
import Forgot from './pages/Authentication/Forgot';

function App() {
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return (loading ? (
    <Loader />
  ) : (
    <>
      <Routes>

        <Route
          path="/"
          element={
            <>
                <PageTitle title="Gallery | IIITU - Admin" />
                <Gallery />
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
          path="/clubs/:id"
          element={
            <>
              <PageTitle title="Clubs-Page | Clubs Dashboard" />
              <ClubsPage />
            </>
          }
        />
        
        <Route
          path="/curriculum"
          element={
            <>
              <PageTitle title="Curriculum | IIITU - Admin" />
              <Curriculum />
            </>
          }
        />
        <Route
          path="/curriculum/:id"
          element={
            <>
              <PageTitle title="Events-Page | Events Dashboard" />
              <CurriculumPage/>
            </>
          }
        />
        <Route
          path='/signin'
          element={
            <>
              <PageTitle title='Authentication | Admin Login' />
              <SignupAdmin />
            </>
          } />
          <Route
          path='/forgot'
          element={
            <>
              
              <PageTitle title='Reset Password | Admin Login' />
              <Forgot />
            </>
          } />
        <Route
          path="/news"
          element={
            <>
              <PageTitle title="News | IIITU - Admin" />
              <News />
            </>
          }
        />
        <Route
          path="/printmedia"
          element={
            <>
              <PageTitle title="Print Media | IIITU - Admin" />
              <PrintMedia />
            </>
          }
        />
        
        <Route
          path="/events"
          element={
            <>
              <PageTitle title="Events | IIITU - Admin" />
              <Events />
            </>
          }
        />
        <Route
          path="/events/:id"
          element={
            <>
              <PageTitle title="Events-Page | Events Dashboard" />
              <EventsPage />
            </>
          }
        />
        <Route
          path="/admissions"
          element={
            <>
              <PageTitle title="Admissions | IIITU - Admin" />
              <Admissions />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | IIITU - Admin" />
              <Profile />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | IIITU - Admin" />
              <Settings />
            </>
          }
        />
        <Route
          path="/signin"
          element={
            <>
              <PageTitle title="Signin | IIITU - Admin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <PageTitle title="Signup | IIITU - Admin" />
              <SignUp />
            </>
          }
        />
        <Route
          path="/admin/tenderAdd"
          element={
            <>
              <PageTitle title="Tender | Tender Add" />
              <Tender />
            </>
          }
        />
        <Route
          path="/admin/tenderEdits"
          element={
            <>
              <PageTitle title="Tender | Tender Edits and Delete" />
              <TenderEdits />
            </>
          }
        />
        <Route
          path="/admin/recruitmentAdd"
          element={
            <>
              <PageTitle title="Recruitment | Recruitment ADD" />
              <AddRecruitments />
            </>
          }
        />
        <Route
          path="/admin/recruitmentEdits"
          element={
            <>
              <PageTitle title="Recruitment | Recruitment Edit and Delete" />
              <RecruitmentEdits />
            </>
          }
        />
        <Route
          path="/admin/facultyAdd"
          element={
            <>
              <PageTitle title="Faculty | Faculty Add" />
              <FacultyAdd />
            </>
          }
        />
        <Route
          path="/admin/facultyModify"
          element={
            <>
              <PageTitle title="Faculty | Faculty Edit" />
              <FacultyEdit />
            </>
          }
        />
        <Route
          path="/Faculty/Edits/:id"
          element={
            <>
              <PageTitle title="Faculty | Faculty Edits" />
              <FacultyAllEdit />
            </>
          }
        />
      </Routes>
    </>
  ));
}
export default App;
