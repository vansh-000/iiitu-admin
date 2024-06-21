import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableGallery from '../components/Tables/TableGallery';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../utils/apiURl';
import TableAdmissions from '../components/Tables/TableAdmissions';
import { useNavigate } from 'react-router-dom';

const Admissions = () => {
  const [data, setData] = useState();
  const [selectedType, setSelectedType] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);
 const navigate=useNavigate();
  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/admission`);
      setData(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const [doc, setDoc] = useState([]);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const programRef = useRef();
  const batchRef = useRef();
  const yearRef = useRef();
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setDoc(files);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const program = programRef.current.value;
    const batch = batchRef.current.value;
    const year = yearRef.current.value;
    const type = selectedType;
    try {
      const formData = new FormData();
      doc.forEach((doc) => {
        formData.append("doc", doc);
      });
      formData.append("title", title);
      formData.append("description", description);
      formData.append("program", program);
      formData.append("batch", batch);
      formData.append("year", year);
      formData.append("type", type);
      await axios.post(`${API}/admission`, formData, {
        headers: {
          Authorization:`Brear ${localStorage.getItem('token')}`,
          "Content-Type": "multipart/form-data"
        }
      });
      toast.success("Data Uploaded!");
      fetchData();
    }
    catch (err) {
      if (err.response.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/admission/${id}`,{
        headers:{
          Authorization:`Brear ${localStorage.getItem('token')}`
        }
      });
      toast.success("Data Deleted!");
      fetchData();
    }
    catch (err) {
      if (err.response.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  }


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Admissions" />
      <form onSubmit={handleAdd}>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Title
          </label>
          <input
            name="title"
            type="text"
            ref={titleRef}
            placeholder="Title"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className='mt-4'>
          <label className="mb-3 block text-black dark:text-white">
            Description
          </label>
          <input
            name="description"
            ref={descriptionRef}
            type="text"
            placeholder="Description"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className='mt-4'>
          <label className="mb-3 block text-black dark:text-white">
            Program
          </label>
          <input
            name="program"
            ref={programRef}
            type="text"
            placeholder="Program (e.g. UG, PG, PHD)"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className='mt-4'>
          <label className="mb-3 block text-black dark:text-white">
            Batch
          </label>
          <input
            name="batch"
            ref={batchRef}
            type="text"
            placeholder="Batch (e.g. 2022-26)"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className='mt-4'>
          <label className="mb-3 block text-black dark:text-white">
            Year
          </label>
          <input
            name="year"
            ref={yearRef}
            type="text"
            placeholder="Year (e.g. 2024)"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Select Department
            </label>

            <div className="relative z-20 bg-white dark:bg-form-input">
              <select
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
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
                  Select Department
                </option>
                <option
                  value="JOSAA"
                  className="text-body dark:text-bodydark"
                >
                  JOSAA/CSAB
                </option>
                <option
                  value="DASA"
                  className="text-body dark:text-bodydark"
                >
                  DASA
                </option>
                <option
                  value="Scholarship"
                  className="text-body dark:text-bodydark"
                >
                  Scholarship
                </option>
                <option
                  value="Fee Structure"
                  className="text-body dark:text-bodydark"
                >
                  Fee Structure
                </option>
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
        </div>

        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Attach file
          </label>
          <input
            type="file"
            className="w-1/2 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            multiple
            name="doc"
            onChange={handleFileChange}
            accept=".pdf"
            required
          />
        </div>
        <button
          className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Admission Notification
        </button>
      </form>
      <div className="flex flex-col gap-10 mt-5">
        {data ? (
          <TableAdmissions data={data} handleDelete={handleDelete} />
        ) : (
          <h1>No Data!</h1>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Admissions;