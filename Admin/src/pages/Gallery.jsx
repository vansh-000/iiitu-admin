import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableGallery from '../components/Tables/TableGallery';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../utils/apiURl';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Gallery = () => {
  const [loading, setLoading] = useState(false);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState('');
  const [albumTitle, setAlbumTitle] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      return navigate('/signin');
    }
    const { Allow } = jwtDecode(token);
    if (!Allow?.[0]) {
      navigate('/curriculum');
    }
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${API}/album`);
      setAlbums(response.data.album);
      console.log(response.data.album);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const [images, setImages] = useState([]);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleAdd = async (e) => {
    setLoading(true);
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    if (!selectedAlbum) {
      setLoading(false);
      return toast.error('Please select an album');
    }
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('image', image);
      });
      formData.append('title', title);
      formData.append('description', description);
      formData.append('albumId', selectedAlbum);

      await axios.post(`${API}/album/${selectedAlbum}/image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Images Uploaded!');
      setLoading(false);
      fetchAlbums();
    } catch (err) {
      if (err.response.status === 401) {
        return navigate('/signin');
      }
      setLoading(false);
      toast.error(`Error: ${err}`);
    }
  };

  const handleAlbumDelete = async (id) => {
    try {
      await axios.delete(`${API}/album/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.error('Album Deleted!');
      fetchAlbums();
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
      await axios.delete(`${API}/image/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.error('Image Deleted!');
      fetchAlbums();
    } catch (err) {
      if (err.response.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  };

  const handleCreateAlbum = async () => {
    if (!albumTitle) return toast.error('Album title cannot be empty');
    try {
      await axios.post(
        `${API}/album`,
        { title: albumTitle },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success('Album created!');
      setAlbumTitle('');
      fetchAlbums();
    } catch (err) {
      toast.error(`Error: ${err}`);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gallery" />
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

        {/* Album Selection */}
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Select Album
          </label>
          <select
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
            value={selectedAlbum}
            onChange={(e) => setSelectedAlbum(e.target.value)}
            required
          >
            <option value="">Select Album</option>
            {albums?.map((album) => (
              <option key={album._id} value={album._id}>
                {album.title}
              </option>
            ))}
          </select>
        </div>

        {/* File Upload */}
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
        <button
          disabled={loading}
          className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          {loading ? (
            <div className="inline-block h-5 w-5 animate-spin rounded-full border-[0.2rem] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          ) : (
            <span>Add Photos</span>
          )}
        </button>
      </form>

      {/* Create New Album */}
      <div className="mt-8">
        <h3 className="text-black dark:text-white">Create a New Album</h3>
        <input
          type="text"
          value={albumTitle}
          onChange={(e) => setAlbumTitle(e.target.value)}
          placeholder="Album Title"
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black dark:border-form-strokedark dark:bg-form-input dark:text-white"
        />
        <button
          onClick={handleCreateAlbum}
          className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90"
        >
          Create Album
        </button>
      </div>

      <div className="flex flex-col gap-10 mt-5">
        {albums?.length > 0 ? (
          albums?.map((album) => (
            <>
              <TableGallery
                handleAlbumDelete={() => handleAlbumDelete(album._id)}
                data={album.images}
                title={album.title}
                albumId={album._id}
                fetchAlbums={fetchAlbums}
                handleDelete={handleDelete}
              />
            </>
          ))
        ) : (
          <h1>No Albums!</h1>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Gallery;
