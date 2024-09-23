import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableGallery from '../components/Tables/TableGallery';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../utils/apiURl';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import TableCarousel from '../components/Tables/TableCarousel';


const Carousel = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null); // Store ID of the carousel being edited
  const [isEditing, setIsEditing] = useState(false);

  const titleRef = useRef();
  const editTitleRef = useRef(); // Ref for the edit input
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (!token) {
      return navigate('/signin');
    }
    const { Allow } = jwtDecode(token);
    if (!Allow?.[15]) {
      navigate('/curriculum');
    }
  }, [token, navigate]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/carousel`);
      const sortedData = response.data?.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setData(sortedData);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    const title = titleRef.current.value;
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('image', image);
      });
      formData.append('title', title);

      await axios.post(`${API}/carousel`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setLoading(false);
      toast.success('Carousel Uploaded!');
      fetchData();
    } catch (err) {
      if (err.response?.status === 401) {
        return navigate('/signin');
      }
      setLoading(false);
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/carousel/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Carousel Deleted!');
      fetchData();
    } catch (err) {
      if (err.response?.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err.message}`);
    }
  };

  const handleEdit = async (id, newTitle) => {
    if (!newTitle) {
      toast.error('Title is required');
      return;
    }
    try {
      await axios.put(
        `${API}/carousel/${id}`,
        { title: newTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success('Carousel title updated successfully!');
      fetchData();
    } catch (err) {
      if (err.response.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error updating carousel: ${err.message}`);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedTitle = editTitleRef.current.value;
    try {
      await axios.put(
        `${API}/carousel/${editId}`,
        { title: updatedTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success('Carousel Updated!');
      setIsEditing(false);
      setEditId(null);
      fetchData();
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401) {
        return navigate('/signin');
      }
      setLoading(false);
      toast.error(`Error: ${err.message}`);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Carousel" />
      <form onSubmit={isEditing ? handleUpdate : handleAdd}>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            {isEditing ? 'Edit Title' : 'Title'}
          </label>
          <input
            name="title"
            type="text"
            ref={isEditing ? editTitleRef : titleRef}
            placeholder="Title"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        {!isEditing && (
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
        )}
        <button
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          {loading ? (
            <div className="inline-block h-5 w-5 animate-spin rounded-full border-[0.2rem] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          ) : (
            <span>{isEditing ? 'Update Carousel' : 'Add Carousel'}</span>
          )}
        </button>
      </form>

      <div className="flex flex-col gap-10 mt-5">
        <TableCarousel
          data={data}
          handleDelete={handleDelete}
          handleEdit={handleEdit} // Pass the edit handler
        />
      </div>
    </DefaultLayout>
  );
};

export default Carousel;
