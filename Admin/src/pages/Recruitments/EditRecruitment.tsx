import RecruitmentEditCard from './RecruitmentEditCard';
import { API } from '../../utils/apiURl';
import axios from 'axios';
import { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const RecruitmentEdits = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      return navigate('/signin');
    }
    const { Allow } = jwtDecode(token);
    if (!Allow?.[10]) {
      navigate('/minutes');
    }
  }, []);
  const [data, setData] = useState([]);
  const fetchRecruitment = async () => {
    try {
      let response = await axios.get(`${API}/recruitment`);
      if (response.status === 200) {
        setData(response.data);
      }
      //   setFetchDone(true);
    } catch (err) {
      console.error('Error in Recruitment', err);
      //   setFetchDone(false);
    }
  };
  useEffect(() => {
    fetchRecruitment();
  }, []);

  console.log(data);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Recruitment" />
      <div className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
        <div className="flex flex-col gap-7.5">
          <RecruitmentEditCard data={data} fetchData={fetchRecruitment} />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default RecruitmentEdits;
