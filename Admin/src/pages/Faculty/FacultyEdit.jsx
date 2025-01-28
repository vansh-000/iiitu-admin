import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { API } from '../../utils/apiURl';
import FacultyCardProvider from './FacultyCardProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { FaSearch } from 'react-icons/fa';

const FacultyEdit = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
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

  const filteredData = data.filter((faculty) => {
    const matchesSearch = faculty.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment
      ? faculty.department === selectedDepartment
      : true;
    return matchesSearch && matchesDepartment;
  });

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Faculty Edit and Delete" />
      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex justify-between items-center mb-4">
          <div>
            <button
              onClick={() => setSelectedDepartment('')}
              className={`mr-2 px-4 py-2 rounded transition duration-200 ${
                selectedDepartment === ''
                  ? 'bg-danger text-white'
                  : 'bg-danger/20 text-black'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedDepartment('SOC')}
              className={`mr-2 px-4 py-2 rounded transition duration-200 ${
                selectedDepartment === 'SOC'
                  ? 'bg-danger text-white'
                  : 'bg-danger/20 text-black'
              }`}
            >
              SOC
            </button>
            <button
              onClick={() => setSelectedDepartment('SOE')}
              className={`mr-2 px-4 py-2 rounded transition duration-200 ${
                selectedDepartment === 'SOE'
                  ? 'bg-danger text-white'
                  : 'bg-danger/20 text-black'
              }`}
            >
              SOE
            </button>
            <button
              onClick={() => setSelectedDepartment('SOBS')}
              className={`mr-2 px-4 py-2 rounded transition duration-200 ${
                selectedDepartment === 'SOBS'
                  ? 'bg-danger text-white'
                  : 'bg-danger/20 text-black'
              }`}
            >
              SOBS
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-3 pl-10 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <FaSearch />
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-7.5">
          {filteredData.length > 0 ? (
            <FacultyCardProvider data={filteredData} fetchData={fetchFaculty} />
          ) : (
            <div className="text-center text-gray-500 mt-4">
              No faculty found.
            </div>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default FacultyEdit;
