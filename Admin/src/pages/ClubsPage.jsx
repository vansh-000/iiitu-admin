import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { API } from '../../../Faculty/src/utils/apiURl';
import { useNavigate, useParams } from 'react-router-dom';
const Clubs = () => {
  const { id } = useParams();
  const [data, setData] = useState();
//   const [club, setClub] = useState();
  const refLogo=useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
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
      const response = await axios.get(`${API}/clubs/${id}`);
      setData(response.data.data);

      console.log(response.data.data);
    } catch (err) {
      console.error('error in edit club', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

//   const [images, setImages] = useState([]);
  const nameRef = useRef();
  const linkRef = useRef();
  const descriptionRef = useRef();
  const facultyRef = useRef();
  const presidentRef = useRef();
//   const handleEmpty = () => {
//     nameRef.current.value = '';
//     linkRef.current.value = '';
//     descriptionRef.current.value = '';
//     facultyRef.current.value = '';
//     presidentRef.current.value = '';
//     socialLinks.current.value = [
//       {
//         socialMedia: 'Facebook',
//         link: '',
//       },
//       {
//         socialMedia: 'Instagram',
//         link: '',
//       },
//       {
//         socialMedia: 'Twitter',
//         link: '',
//       },
//       {
//         socialMedia: 'Linkedin',
//         link: '',
//       },
//       {
//         socialMedia: 'Github',
//         link: '',
//       },
//       {
//         socialMedia: 'Youtube',
//         link: '',
//       },
//     ];
//     refLogo.current?.files[0];
//   };
  const handleAdd = async (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const link = linkRef.current.value;
    const description = descriptionRef.current.value;
    const facultyId = facultyRef.current.value;
    const president = presidentRef.current.value;
    const data2={
        'Name':name,
        'Link':link,
        'Description':description,
        'facultyIncharge':facultyId,
        'president':president,
        'socialLinks':socialLinks,
        'Logo':refLogo.current?.files[0],
        'OldLogo':null
      }
      if(refLogo.current?.files[0]){
        data2['OldLogo']=data.Logo;
      }
    try {
     const response= await axios.put(`${API}/clubs/${id}`, data2, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    //   console.log(response);
    if(response.status===200){
        toast.success(`${name} Club updated successfully!`);
        navigate('/clubs');
    }

    //   handleEmpty();
    //   fetchData();
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
    console.log(name,value)
    updatedSocialLinks[index] = { ...updatedSocialLinks[index], ['link']: value };
    setSocialLinks(updatedSocialLinks);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Edit ${name} Club Details`} />
      <Toaster />
      <form onSubmit={handleAdd}>
        <div>
          <label className="mb-3 block text-black dark:text-white">Name</label>
          {data&&data.Name&&<input
            name="name"
            type="text"
            ref={nameRef}
            defaultValue={data.Name}
            placeholder="Name"
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />}
        </div>
        <div className="mt-4">
        <label htmlFor="ClubLogo" className="mb-3 block text-black dark:text-white">Change Club Logo
        </label>
      <input
        id="ClubLogo"
        type="file"
        accept="image/*"
        ref={refLogo}
        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
      /></div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Website Link
          </label>
          {data&&<input
            name="websiteLink"
            ref={linkRef}
            defaultValue={data.Link}
            type="text"
            placeholder="Website Link"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />}
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Description
          </label>
          {data&&data.Description&&<input
            name="description"
            ref={descriptionRef}
            defaultValue={data.Description}
            type="text"
            placeholder="Description"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />}
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Faculty Id
          </label>
          {data&&data.facultyIncharge&&<input
            name="facultyId"
            ref={facultyRef}
            required
            type="text"
            defaultValue={data.facultyIncharge}
            placeholder="Faculty Id"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />}
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            President
          </label>
          {data&&<input
            name="president"
            ref={presidentRef}
            defaultValue={data.president}
            required
            type="text"
            placeholder="President"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />}
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Social Links
          </label>
          <div className="flex flex-wrap gap-4">
            {data && data.socialLinks && (
              <>
                {data.socialLinks.map((social, index) => (
                  <input
                    key={index}
                    name={social.socialMedia}
                    type="text"
                    defaultValue={social.link}
                    placeholder={social.socialMedia}
                    onChange={(e) => handleInputChange(index, e)}
                    className="w-full md:w-1/2 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                ))}
              </>
            )}
          </div>
        </div>
        <button className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
          Update Club
        </button>
      </form>
    </DefaultLayout>
  );
};

export default Clubs;
