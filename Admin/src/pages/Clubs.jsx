import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import TableClub from '../components/Tables/TableClub';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { API } from '../utils/apiURl';

const Clubs = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      return navigate('/signin');
    }
    const { Allow } = jwtDecode(token);
    if (!Allow?.[4]) {
      navigate('/events');
    }
  }, []);

  const [socialLinks, setSocialLinks] = useState([
    {
      socialMedia: 'Facebook',
      link: '',
    },
    {
      socialMedia: 'Instagram',
      link: '',
    },
    {
      socialMedia: 'Twitter',
      link: '',
    },
    {
      socialMedia: 'Linkedin',
      link: '',
    },
    {
      socialMedia: 'Github',
      link: '',
    },
    {
      socialMedia: 'Youtube',
      link: '',
    },
  ]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/clubs`);
      setData(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [images, setImages] = useState([]);
  const nameRef = useRef();
  const linkRef = useRef();
  const descriptionRef = useRef();
  const objectiveRef = useRef();
  const facultyRef = useRef();
  const presidentRef = useRef();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleEmpty = () => {
    nameRef.current.value = '';
    linkRef.current.value = '';
    descriptionRef.current.value = '';
    objectiveRef.current.value = '';
    facultyRef.current.value = '';
    presidentRef.current.value = '';
    socialLinks.current.value = [
      {
        socialMedia: 'Facebook',
        link: '',
      },
      {
        socialMedia: 'Instagram',
        link: '',
      },
      {
        socialMedia: 'Twitter',
        link: '',
      },
      {
        socialMedia: 'Linkedin',
        link: '',
      },
      {
        socialMedia: 'Github',
        link: '',
      },
      {
        socialMedia: 'Youtube',
        link: '',
      },
    ];
    setImages([]);
  };

  const handleAdd = async (e) => {
    setLoading(true);
    e.preventDefault();
    const name = nameRef.current.value;
    const link = linkRef.current.value;
    const description = descriptionRef.current.value;
    const objective = objectiveRef.current.value;
    const facultyId = facultyRef.current.value;
    const president = presidentRef.current.value;
    try {
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('Logo', image);
      });
      formData.append('Name', name);
      formData.append('Link', link);
      formData.append('Description', description);
      formData.append('objective', objective);
      formData.append('facultyIncharge', facultyId);
      formData.append('president', president);
      socialLinks.forEach((item, index) => {
        formData.append(`socialLinks[${index}][socialMedia]`, item.socialMedia);
        formData.append(`socialLinks[${index}][link]`, item.link);
      });
      await axios.post(`${API}/clubs`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      toast.success('New Club Created!');
      handleEmpty();
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
      await axios.delete(`${API}/clubs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.error('Club Deleted!');
      fetchData();
    } catch (err) {
      if (err.response.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSocialLinks = [...socialLinks];
    updatedSocialLinks[index] = { ...updatedSocialLinks[index], [name]: value };
    setSocialLinks(updatedSocialLinks);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Clubs" />
      <Toaster />
      <form onSubmit={handleAdd}>
        <div>
          <label className="mb-3 block text-black dark:text-white">Name</label>
          <input
            name="name"
            type="text"
            ref={nameRef}
            placeholder="Name"
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Website Link
          </label>
          <input
            name="websiteLink"
            ref={linkRef}
            type="text"
            placeholder="Website Link"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Introduction
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
            Objective
          </label>
          <input
            name="objective"
            ref={objectiveRef}
            type="text"
            placeholder="Objective"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Faculty Id
          </label>
          <input
            name="facultyId"
            ref={facultyRef}
            required
            type="text"
            placeholder="Faculty Id"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            President
          </label>
          <input
            name="president"
            ref={presidentRef}
            required
            type="text"
            placeholder="President"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Social Links
          </label>
          <div className="flex flex-wrap gap-4">
            <input
              name="facebook"
              type="text"
              placeholder="Facebook"
              onChange={(e) => handleInputChange(0, e)}
              className="w-full md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <input
              name="instagram"
              type="text"
              placeholder="Instagram"
              onChange={(e) => handleInputChange(0, e)}
              className="w-full md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <input
              name="twitter"
              type="text"
              placeholder="Twitter"
              onChange={(e) => handleInputChange(0, e)}
              className="w-full md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <input
              name="linkedin"
              type="text"
              placeholder="Linkedin"
              onChange={(e) => handleInputChange(0, e)}
              className="w-full md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <input
              name="github"
              type="text"
              placeholder="Github"
              onChange={(e) => handleInputChange(0, e)}
              className="w-full md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
            <input
              name="youtube"
              type="text"
              placeholder="Youtube"
              onChange={(e) => handleInputChange(0, e)}
              className="w-full md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Attach Logo
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
            <span>Add Club</span>
          )}
        </button>
      </form>
      <div className="flex flex-col gap-10 mt-5">
        <TableClub data={data} handleDelete={handleDelete} />
      </div>
    </DefaultLayout>
  );
};

export default Clubs;
