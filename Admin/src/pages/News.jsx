import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../utils/apiURl';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import TableNews2 from '../components/Tables/TableNews2';

const News = () => {
  const [data, setData] = useState();
  const [isLatest, setIsLatest] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      return navigate('/signin');
    }
    const { Allow } = jwtDecode(token);
    if (!Allow?.[2]) {
      navigate('/printmedia');
    }
  }, []);

  const refImg = useRef();
  const refDoc = useRef();
  const headingRef = useRef();
  const descriptionRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/news`);
      setData(
        response.data.data?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        ),
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const linkRef = useRef();
  const handleAdd = async (e) => {
    setLoading(true);
    e.preventDefault();
    const heading = headingRef.current.value;
    const description = descriptionRef.current.value;
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;
    const link = linkRef.current.value;

    try {
      let formData = new FormData();
      formData.append('heading', heading);
      formData.append('description', description);
      formData.append('startDate', startDate);
      formData.append('endDate', endDate);
      formData.append('isLatest', isLatest);
      formData.append('Link', link);

      if (refDoc.current?.files[0]) {
        formData.append('doc', refDoc.current.files[0]);
      }
      if (refImg.current?.files[0]) {
        formData.append('image', refImg.current.files[0]);
      }

      await axios.post(`${API}/news`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      toast.success('News Uploaded!');
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
      await axios.delete(`${API}/news/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('News Deleted!');
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
      <Breadcrumb pageName="News" />
      <form onSubmit={handleAdd}>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Heading
          </label>
          <input
            name="heading"
            type="text"
            ref={headingRef}
            placeholder="Heading"
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
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">Link</label>
          <input
            name="Link"
            ref={linkRef}
            type="text"
            required
            placeholder="Eg. admission, club/avessh"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Attach Image
          </label>
          <input
            type="file"
            className="w-1/2 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            multiple
            name="image"
            ref={refImg}
            accept="image/*"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Attach Document
          </label>
          <input
            type="file"
            className="w-1/2 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            multiple
            name="doc"
            ref={refDoc}
            accept=".pdf"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Start Date
          </label>
          <input
            name="startDate"
            ref={startDateRef}
            type="date"
            placeholder="Start Date"
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            End Date
          </label>
          <input
            name="endDate"
            ref={endDateRef}
            type="date"
            placeholder="End Date"
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
            <div className="inline-block h-5 w-5 animate-spin rounded-full border-[0.2rem] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          ) : (
            <span>Add News</span>
          )}
        </button>
      </form>
      <div className="flex flex-col gap-10 mt-5">
        <TableNews2
          data={data}
          handleDelete={handleDelete}
          fetchData={fetchData}
        />
      </div>
    </DefaultLayout>
  );
};

export default News;
