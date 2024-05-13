import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import Gallery from './pages/Gallery';
import Curriculum from './pages/Curriculum';

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
          index
          element={
            <>
              <PageTitle title="Dashboard | IIITU - Admin" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/gallery"
          element={
            <>
              <PageTitle title="Gallery | IIITU - Admin" />
              <Gallery />
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
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | IIITU - Admin" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | IIITU - Admin" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | IIITU - Admin" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | IIITU - Admin" />
              <Tables />
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
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | IIITU - Admin" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | IIITU - Admin" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | IIITU - Admin" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | IIITU - Admin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | IIITU - Admin" />
              <SignUp />
            </>
          }
        />
        <Route
        path="admin/tenderAdd"
        element={
          <>
          <PageTitle title='Tender | Tender Add'/>
          <Tender/>
          </>
        }/>
        <Route
        path="admin/tenderEdits"
        element={
          <>
          <PageTitle title='Tender | Tender Edits and Delete'/>
          <TenderEdits/>
          </>
        }/>
        <Route
        path="/admin/recruitmentAdd"
        element={
          <>
          <PageTitle title='Recruitment | Recruitment ADD'/>
          <AddRecruitments/>
          </>
        }/>
        <Route
        path='/admin/recruitmentEdits'
        element={
          <>
          <PageTitle title='Recruitment | Recruitment Edit and Delete'/>
          <RecruitmentEdits/>
          </>
        }/>
      </Routes>
    </>
  );
}

export default App;
