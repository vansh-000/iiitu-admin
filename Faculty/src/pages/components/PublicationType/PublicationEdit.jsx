// import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
// import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { API } from '../../../utils/apiURl';
import JournalEdit from './JournalEdit';
import ConferenceEdit from './ConferenceEdit';
import ChapterEdit from './ChapterEdit';
import BookEdit from './BookEdit';
import PatentEdit from './PatentEdit';
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
      setData(response.data.Publications);
    } catch (err) {
      console.error('error in edit courses', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();
    const heading = refTitle?.current?.value;
    const authors = refAuthors?.current?.value;
    const vol = refVol?.current?.value;
    const page = refPage?.current?.value;
    const publisher = refPublisher?.current?.value;
    const other = refOther?.current?.value;
    const url = refUrl?.current?.value;
    const authorsFinal = authors.split(';');
    if (!heading) {
      return toast.error('Title is required');
    }

    const updatePublication = {
      heading: heading,
      authors: authorsFinal,
      date,
      vol,
      Pages: page,
      publisher,
      indexing: indexing,
      url,
      other,    };
    
    console.log(updatePublication);

    try {
      const response = await axios.put(`${API}/publication/${id}`, updatePublication, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success(`Publication updated successfully!`);
      }
    } catch (err) {
      if (err.response.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Edit Publication Details`} />
      {data?.type === 'Journal' && (
        <JournalEdit
          data={data}
          refAuthors={refAuthors}
          refTitle={refTitle}
          setDate={setDate}
          setIndexing={setIndexing}
          refPage={refPage}
          refPublisher={refPublisher}
          refUrl={refUrl}
          refVol={refVol}
          refOther={refOther}
          handleEdit={handleEdit}
        />
      )}
      {data?.type === 'Conference' && (
        <ConferenceEdit
          data={data}
          refAuthors={refAuthors}
          refTitle={refTitle}
          setDate={setDate}
          setIndexing={setIndexing}
          refPage={refPage}
          refPublisher={refPublisher}
          refUrl={refUrl}
          refVol={refVol}
          refOther={refOther}
          handleEdit={handleEdit}
        />
      )}
      {data?.type === 'Chapter' && (
        <ChapterEdit
          data={data}
          refAuthors={refAuthors}
          refTitle={refTitle}
          setDate={setDate}
          setIndexing={setIndexing}
          refPage={refPage}
          refPublisher={refPublisher}
          refUrl={refUrl}
          refVol={refVol}
          refOther={refOther}
          handleEdit={handleEdit}
        />
      )}
      {data?.type === 'Book' && (
        <BookEdit
          data={data}
          refAuthors={refAuthors}
          refTitle={refTitle}
          setDate={setDate}
          setIndexing={setIndexing}
          refPage={refPage}
          refPublisher={refPublisher}
          refUrl={refUrl}
          refVol={refVol}
          refOther={refOther}
          handleEdit={handleEdit}
        />
      )}
      {data?.type === 'Patent' && (
        <PatentEdit
          data={data}
          refAuthors={refAuthors}
          refTitle={refTitle}
          setDate={setDate}
          setIndexing={setIndexing}
          refPage={refPage}
          refPublisher={refPublisher}
          refUrl={refUrl}
          refVol={refVol}
          refOther={refOther}
          handleEdit={handleEdit}
        />
      )}
    </DefaultLayout>
  );
};

export default PublicationEdit;
