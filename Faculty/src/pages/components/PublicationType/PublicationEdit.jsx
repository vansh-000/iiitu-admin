// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
// import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import {useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { API } from '../../../utils/apiURl';
import JournalEdit from './JournalEdit';
const PublicationEdit = () => {
  const { id } = useParams();
  const refTitle = useRef();
  const refAuthors = useRef();
  const [date, setDate] = useState();
  const refVol = useRef();
  const refPage = useRef();
  const refOther = useRef();
  const refPublisher = useRef();
  const [indexing, setIndexing] = useState();
  const refUrl = useRef();

  const [data, setData] = useState();

//   const refCoursePdf=useRef();

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/publication/${id}`);
    setData(response.data);
    console.log(response.data);
    
    

    } catch (err) {
      console.error('error in edit courses', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleEdit = async (e) => {
    e.preventDefault();

    const data2={
        'title':title,
        'faculty':faculty,
        'children':children.split(',')
      }
      console.log(data2);
      
      
    try {
     const response= await axios.put(`${API}/orgStr/${id}`, data2, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
    if(response.status===200){
        toast.success(`Organization updated successfully!`);
    }
    } catch (err) {
      if(err.response.status===401){
        return navigate('/signin')
      }
      toast.error(`Error: ${err}`);
    }
  };


  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Edit Publication Details`} />
      {data?.type === 'Journal' && <JournalEdit data={data} refAuthors={refAuthors}
                  refTitle={refTitle}
                  setDate={setDate}
                  setIndexing={setIndexing}
                  refPage={refPage}
                  refPublisher={refPublisher}
                  refUrl={refUrl}
                  refVol={refVol}
                  refOther={refOther} />}
              {data?.type === 'Conference' && <ConferenceEdit data={data} refAuthors={refAuthors}
                  refTitle={refTitle}
                  setDate={setDate}
                  setIndexing={setIndexing}
                  refPage={refPage}
                  refPublisher={refPublisher}
                  refUrl={refUrl}
                  refVol={refVol}
                  refOther={refOther} />}
              {data?.type === 'Chapter' && <ChapterView data={data} refAuthors={refAuthors}
                  refTitle={refTitle}
                  setDate={setDate}
                  setIndexing={setIndexing}
                  refPage={refPage}
                  refPublisher={refPublisher}
                  refUrl={refUrl}
                  refVol={refVol}
                  refOther={refOther} />}
              {data?.type === 'Book' && <BookView data={data} refAuthors={refAuthors}
                  refTitle={refTitle}
                  setDate={setDate}
                  setIndexing={setIndexing}
                  refPage={refPage}
                  refPublisher={refPublisher}
                  refUrl={refUrl}
                  refVol={refVol}
                  refOther={refOther} />}
              {data?.type === 'Patent' && <PaitentView data={data} refAuthors={refAuthors}
                  refTitle={refTitle}
                  setDate={setDate}
                  setIndexing={setIndexing}
                  refPage={refPage}
                  refPublisher={refPublisher}
                  refUrl={refUrl}
                  refVol={refVol}
                  refOther={refOther} />}
    </DefaultLayout>
  );
};

export default PublicationEdit;
