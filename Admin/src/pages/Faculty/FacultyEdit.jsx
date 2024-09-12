import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { API } from '../../utils/apiURl';
import FacultyCardProvider from './FacultyCardProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const FacultyEdit = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      return navigate('/signin');
    }
    const { Allow } = jwtDecode(token);
    if (!Allow?.[7]) {
      navigate('/tender/add');
    }
  }, []);

  const fetchFaculty = async () => {
    try {
      let response = await axios.get(`${API}/faculty/allData`);
      if (response.status === 200) {
        setData(response.data);
      }
      //   setFetchDone(true);
    } catch (err) {
      console.error('Error in Tender', err);
      //   setFetchDone(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Faculty Edit and Delete" />
      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex flex-col gap-7.5">
          <FacultyCardProvider data={data} fetchData={fetchFaculty} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FacultyEdit;
