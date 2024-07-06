import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../utils/apiURl';
import TableEvent from '../components/Tables/TableEvent';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Events = () => {
  const [data, setData] = useState();
  const [club, setclub] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
    const {Allow}=jwtDecode(token);
    useEffect(()=>{if(!Allow?.[5]){
        navigate('/admissions')
    }},[])
    
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/event`);
      setData(response.data.events);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchClub = async () => {
    try {
      const response = await axios.get(`${API}/clubs`);
      setclub(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
    fetchClub();
  }, []);
  const [images, setImages] = useState([]);
  const clubRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();
  const nameRef = useRef();
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };
  const handleEmpty = () => {
    clubRef.current.value = '';
    dateRef.current.value = '';
    nameRef.current.value = '';
    descriptionRef.current.value = '';
    setImages([]);
  };
  const getClubId = (clubname) => {
    return new Promise((resolve) => {
      const matchingClub = club.find((club) => club.Name === clubname);
      if (matchingClub) {
        resolve(matchingClub._id);
      } else {
        resolve('');
      }
    });
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    const clubname = clubRef.current.value;
    const date = dateRef.current.value;
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    try {
      const clubId = await getClubId(clubname);
      if (clubId === '') {
        return toast.error('Club Not Found!!');
      }
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('image', image);
      });
      formData.append('club', clubId);
      formData.append('date', date);
      formData.append('name', name);
      formData.append('description', description);
      await axios.post(`${API}/event`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      handleEmpty();
      toast.success('Event Uploaded!');
      fetchData();
    } catch (err) {
      if (err.response.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/event/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Event Deleted!');
      fetchData();
    } catch (err) {
      if (err.response.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Events" />
      <form onSubmit={handleAdd}>
        <div>
          <label className="mb-3 block text-black dark:text-white">Club</label>
          <input
            name="club"
            type="text"
            ref={clubRef}
            placeholder="Club"
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Event Name
          </label>
          <input
            name="name"
            type="text"
            ref={nameRef}
            placeholder="Event Name"
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">Date</label>
          <input
            name="date"
            ref={dateRef}
            type="date"
            placeholder="Date"
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Description
          </label>
          <input
            name="description"
            ref={descriptionRef}
            type="text"
            placeholder="Description"
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Attach file
          </label>
          <input
            type="file"
            className="w-1/2 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            multiple
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>
        <button className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
          Add Event
        </button>
      </form>
      <div className="flex flex-col gap-10 mt-5">
        <TableEvent data={data} handleDelete={handleDelete} />
      </div>
    </DefaultLayout>
  );
};

export default Events;
