import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../utils/apiURl';
import TableAdmissions from '../components/Tables/TableAdmissions';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Admissions = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();
  const [selectedType, setSelectedType] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [isLatest, setIsLatest] = useState(false);
  const [isEditLatest, setIsEditLatest] = useState(false);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [links, setLinks] = useState([{ name: '', url: '' }]);

  useEffect(() => {
    if (!token) {
      return navigate('/signin');
    }
    const { Allow } = jwtDecode(token);
    if (!Allow?.[6]) {
      navigate('/faculty/add');
    }
  }, []);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/admission`);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [doc, setDoc] = useState([]);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const batchRef = useRef();
  const yearRef = useRef();
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setDoc(files);
  };

  const handleLinkChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const addLinkField = () => {
    setLinks([...links, { name: '', url: '' }]);
  };

  const removeLinkField = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const batch = batchRef.current.value;
    const year = yearRef.current.value;

    // Filter out any empty links
    const validLinks = links.filter((link) => link.name && link.url);

    try {
      const formData = new FormData();
      doc.forEach((doc) => {
        formData.append('doc', doc);
      });
      formData.append('title', title);
      formData.append('description', description);
      formData.append('program', selectedProgram);
      formData.append('batch', batch);
      formData.append('year', year);
      formData.append('type', selectedType);
      formData.append('isLatest', isLatest);
      // Send links as a stringified array of objects
      formData.append('links', JSON.stringify(validLinks));

      await axios.post(`${API}/admission`, formData, {
        headers: {
          Authorization: `Brear ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      toast.success('Data Uploaded!');
      fetchData();
    } catch (err) {
      if (err.response.status === 401) {
        return navigate('/signin');
      }
      setLoading(false);
      toast.error(`Error: ${err}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/admission/${id}`, {
        headers: {
          Authorization: `Brear ${token}`,
        },
      });
      toast.success('Data Deleted!');
      fetchData();
    } catch (err) {
      if (err.response.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  };

  const handleLatest = async (id) => {
    try {
      const formData = new FormData();
      formData.append('isLatest', isEditLatest);
      await axios.put(`${API}/admission/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Data Updated!');
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
      <Breadcrumb pageName="Admissions" />
      <form onSubmit={handleAdd}>
        <div>
          <label className="mb-3 block text-black dark:text-white">Title</label>
          <input
            name="title"
            type="text"
            ref={titleRef}
            required="required"
            placeholder="Title"
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
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-5.5 mt-4">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Select Program
            </label>

            <div className="relative z-20 bg-white dark:bg-form-input">
              <select
                value={selectedProgram}
                required="required"
                onChange={(e) => {
                  setSelectedProgram(e.target.value);
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
                  Select Program
                </option>
                <option value="UG" className="text-body dark:text-bodydark">
                  UG
                </option>
                <option value="PG" className="text-body dark:text-bodydark">
                  PG
                </option>
                <option value="PHD" className="text-body dark:text-bodydark">
                  Ph.D
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
          <label className="mb-3 block text-black dark:text-white">Batch</label>
          <input
            name="batch"
            ref={batchRef}
            type="text"
            required="required"
            placeholder="Batch (e.g. 2022-26)"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">Year</label>
          <input
            name="year"
            ref={yearRef}
            required="required"
            type="text"
            placeholder="Year (e.g. 2024)"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="flex flex-col gap-5.5 mt-4">
          <div>
            <label className="mb-3 block text-black dark:text-white">
              Select Section
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
                  Select Section
                </option>
                <option value="JOSAA" className="text-body dark:text-bodydark">
                  JOSAA/CSAB
                </option>
                <option value="DASA" className="text-body dark:text-bodydark">
                  DASA
                </option>
                <option value="PG" className="text-body dark:text-bodydark">
                  PG Notification
                </option>
                <option value="PHD" className="text-body dark:text-bodydark">
                  Ph.D Notification
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
          <label className="mb-3 block text-black dark:text-white">Links</label>
          {links.map((link, index) => (
            <div key={index} className="flex gap-4 mb-2">
              <input
                type="text"
                placeholder="Link Name"
                value={link.name}
                onChange={(e) =>
                  handleLinkChange(index, 'name', e.target.value)
                }
                className="w-1/3 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="url"
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleLinkChange(index, 'url', e.target.value)}
                className="w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              {links.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLinkField(index)}
                  className="px-3 py-1 bg-danger text-white rounded-md text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addLinkField}
            className="mt-2 px-3 py-1 bg-primary text-white rounded-md text-sm"
          >
            Add Link
          </button>
        </div>

        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Attach file
          </label>
          <input
            type="file"
            required="required"
            className="w-1/2 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            multiple
            name="doc"
            onChange={handleFileChange}
            accept=".pdf"
          />
        </div>

        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white flex flex-row items-center gap-1">
            Is Latest:
            <input
              className="size-4"
              type="checkbox"
              checked={isLatest}
              onChange={(e) => setIsLatest(e.target.checked)}
            />
          </label>
        </div>

        <button
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          {loading ? (
            <div className="inline-block h-7 w-7 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          ) : (
            <span>Add Admission Notification</span>
          )}
        </button>
      </form>
      <div className="flex flex-col gap-10 mt-5">
        {data && data.length > 0 ? (
          <TableAdmissions
            data={data}
            handleDelete={handleDelete}
            handleLatest={handleLatest}
            isLatest={isEditLatest}
            setIsLatest={setIsEditLatest}
          />
        ) : (
          <h1>No Data!</h1>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Admissions;
