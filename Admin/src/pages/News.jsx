import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableGallery from '../components/Tables/TableGallery';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../utils/apiURl';
import TableNews from '../components/Tables/TableNews';
import { FcCdLogo } from 'react-icons/fc';

const News = () => {
  const [data, setData] = useState();
  const token = localStorage.getItem('token');
  const refImg = useRef();
  const refDoc = useRef();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/news`);
      setData(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const headingRef = useRef();
  const descriptionRef = useRef();
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const files2 = Array.from(event.target.files);
    setImages(files);
    setDocs(files2);
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    const heading = headingRef.current.value;
    const description = descriptionRef.current.value;

    try {
        if (!refDoc.current?.files[0] && !refImg.current?.files[0]) {
            return toast.error("Please add at least an image or document");
        }

        let formData = new FormData();
        formData.append("heading", heading);
        formData.append("description", description);

        if (refDoc.current?.files[0]) {
            formData.append("doc", refDoc.current.files[0]);
        }
        if (refImg.current?.files[0]) {
            formData.append("image", refImg.current.files[0]);
        }

        await axios.post(`${API}/news`, formData, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        });

        toast.success("News Uploaded!");
        fetchData();
    } catch (err) {
        console.log("Error:", err);
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
      console.log('Error:', err);
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
        <button className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
          Add News
        </button>
      </form>
      <div className="flex flex-col gap-10 mt-5">
        <TableNews data={data} handleDelete={handleDelete} />
      </div>
    </DefaultLayout>
  );
};

export default News;
