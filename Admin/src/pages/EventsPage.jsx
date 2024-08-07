import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../utils/apiURl';
import DatePickerOneUnReq from '../components/Forms/DatePicker/DatePickerOneUnReq';

const EventsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLatest, setIsLatest] = useState(false);
  const refImage = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedMonth = month < 10 ? '0' + month : month;
    return `${formattedDay}-${formattedMonth}-${year}`;
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/event/${id}`);
      setData(response.data.event);
      setIsLatest(response.data.event.isLatest);
    } catch (err) {
      console.error('error in edit event', err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const nameRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const descriptionRef = useRef();
  const handleAdd = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const description = descriptionRef.current.value;
    const startDate = startDateRef.current.value || data.startDate;
    const endDate = endDateRef.current.value || data.endDate;
    const data2 = {
      name: name,
      startDate: startDate,
      endDate: endDate,
      description: description,
      image: refImage.current?.files[0],
      OldImage: null,
      isLatest: isLatest,
    };
    if (refImage.current?.files[0]) {
      data2['OldImage'] = data.image;
    }
    try {
      const response = await axios.put(`${API}/event/${id}`, data2, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success(`${name} event updated successfully!`);
        navigate('/events');
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
      <Breadcrumb pageName={`Edit Events Details`} />
      <Toaster />
      <form onSubmit={handleAdd}>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Organizer: {data?.department}
          </label>
        </div>
        <div>
          <label className="mb-3 block text-black dark:text-white">Name</label>
          {data && data.name && (
            <input
              name="name"
              type="text"
              ref={nameRef}
              defaultValue={data.name}
              placeholder="Name"
              required
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          )}
        </div>
        <div className="mt-4">
          <label
            htmlFor="eventLogo"
            className="mb-3 block text-black dark:text-white"
          >
            Change event Image
          </label>
          <input
            id="eventLogo"
            type="file"
            accept="image/*"
            ref={refImage}
            className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          {data && data.startDate && (
            <>
              <label className="mb-3 block text-black dark:text-white">
                Start Date: {formatDate(data.startDate)}
              </label>

              <DatePickerOneUnReq refDate={startDateRef} />
            </>
          )}
        </div>
        <div className="mt-4">
          {data && data.endDate && (
            <>
              <label className="mb-3 block text-black dark:text-white">
                End Date: {formatDate(data.endDate)}
              </label>
              <DatePickerOneUnReq refDate={endDateRef} />
            </>
          )}
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Description
          </label>
          {data && data.description && (
            <input
              name="description"
              ref={descriptionRef}
              defaultValue={data.description}
              type="text"
              placeholder="Description"
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          )}
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
        <button className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
          Update event
        </button>
      </form>
    </DefaultLayout>
  );
};

export default EventsPage;
