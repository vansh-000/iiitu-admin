import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../utils/apiURl';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import TablePolicy from '../components/Tables/TablePolicy.jsx';

const TYPE = ['Ordinance', 'Institute Policy'];

const Policy = () => {
  const [data, setData] = useState();
  const [selectedType, setSelectedType] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate('/signin');
    }
    const { Allow } = jwtDecode(token);
    if (!Allow?.[12]) {
      return navigate('/profile');
    }
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/policy`);
      setData(response.data.Docs);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [Docs, setDocs] = useState([]);
  const titleRef = useRef();
  const typeRef = useRef();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setDocs(files);
  };

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const type = selectedType;
    try {
      const formData = new FormData();
      Docs.forEach((Doc) => {
        formData.append('Doc', Doc);
      });
      formData.append('title', title);
      formData.append('type', type);
      await axios.post(`${API}/policy`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('File Uploaded!');
      fetchData();
    } catch (err) {
      if (err?.response?.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/policy/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('File Deleted!');
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
      <Breadcrumb pageName="Policies" />
      <form onSubmit={handleAdd}>
        <div>
          <label className="mb-3 block text-black dark:text-white">Title</label>
          <input
            name="title"
            type="text"
            ref={titleRef}
            placeholder="Title"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Type of Policy
          </label>

          <div className="relative z-20 bg-white dark:bg-form-input">
            <select
              value={selectedType}
              required="required"
              onChange={(e) => {
                setSelectedType(e.target.value);
                changeTextColor();
              }}
              className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-8 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                isOptionSelected ? 'text-black dark:text-white' : ''
              }`}
            >
              <option
                value=""
                disabled
                className="text-body dark:text-bodydark"
              >
                Select Policy
              </option>
              {TYPE.map((ty, index) => (
                <option
                  value={ty}
                  key={index}
                  className="text-body dark:text-bodydark"
                >
                  {ty}
                </option>
              ))}
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

        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Attach file
          </label>
          <input
            type="file"
            className="w-1/2 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            multiple
            name="pdf"
            onChange={handleFileChange}
            accept=".pdf"
            required
          />
        </div>
        <button className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
          Add Policy
        </button>
      </form>
      <div className="flex flex-col gap-10 mt-5">
        <TablePolicy data={data} handleDelete={handleDelete} />
      </div>
    </DefaultLayout>
  );
};

export default Policy;
