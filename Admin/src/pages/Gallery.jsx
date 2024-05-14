import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableGallery from '../components/Tables/TableGallery';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../utils/apiURl';

const Gallery = () => {
  const [data, setData] = useState();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/image`);
      setData(response.data.images);
    }
    catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);
  const [images, setImages] = useState([]);
  const titleRef = useRef();
  const descriptionRef = useRef()
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append("image", image);
      });
      formData.append("title", title);
      formData.append("description", description);
      await axios.post(`${API}/image`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      toast.success("Images Uploaded!");
      fetchData();
    }
    catch (err) {
      console.log("Error:", err);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/image/${id}`);
      toast.success("Image Deleted!");
      fetchData();
    }
    catch (err) {
      console.log("Error:", err);
    }
  }


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gallery" />
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
          className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Photos
        </button>
      </form>
      <div className="flex flex-col gap-10 mt-5">
        <TableGallery data={data} handleDelete={handleDelete} />
      </div>
    </DefaultLayout>
  );
};

export default Gallery;