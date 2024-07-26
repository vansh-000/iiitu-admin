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
  const [selectedClub, setSelectedClub] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
    useEffect(()=>{
      if (!token) {
        return navigate('/signin');
      }
      const {Allow}=jwtDecode(token);
      if(!Allow?.[5]){
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
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
    fetchClub();
  }, []);
  const [images, setImages] = useState([]);
  const descriptionRef = useRef();
  const dateRef = useRef();
  const nameRef = useRef();
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };
  const handleEmpty = () => {
    dateRef.current.value = '';
    nameRef.current.value = '';
    descriptionRef.current.value = '';
    setImages([]);
  };
  
  const handleAdd = async (e) => {
    e.preventDefault();
    const date = dateRef.current.value;
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('image', image);
      });
      formData.append('club', selectedClub);
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
      console.error(err);
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
      console.error(err);
      if (err?.response?.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  };const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Events" />
      <form onSubmit={handleAdd}>
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Select Club
            </label>

            <div className="relative z-20 bg-white dark:bg-form-input">
              <select
                value={selectedClub}
                required="required"
                onChange={(e) => {
                  setSelectedClub(e.target.value);
                  changeTextColor();
                }}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-8 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
                  }`}
              >
                <option
                  value=""
                  disabled
                  className="text-body dark:text-bodydark"
                >
                  Select Club
                </option>
                {club&&club.map((club,index) => (
                  <option key={index} value={`${club._id}`}
                     className="text-body dark:text-bodydark"
                  >
                    {club.Name}
                    </option>))
                }
              
              </select>

              <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill="#637381"
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
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
