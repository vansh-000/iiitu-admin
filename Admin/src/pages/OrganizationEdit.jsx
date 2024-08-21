import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { Children, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../utils/apiURl';
const OrganizationEdit = () => {
  const { id } = useParams();

  const [data, setData] = useState();

//   const refCoursePdf=useRef();

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const titleRef = useRef();
  const facultyRef=useRef();
  const childrenRef=useRef();
 
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/orgStr/${id}`);
    setData(response.data[0]);
    console.log(response.data[0].children.toString());
    
    

    } catch (err) {
      console.error('error in edit courses', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleEdit = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const faculty=facultyRef.current.value;
    const children=childrenRef.current.value;

    const data2={
        'title':title,
        'faculty':faculty,
        'children':children.split(',')
      }
      console.log(data2);
      
      
    try {
     const response= await axios.put(`${API}/orgStr/${id}`, data2, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    
    if(response.status===200){
        toast.success(`Organization updated successfully!`);
    }
    } catch (err) {
      if(err.response.status===401){
        return navigate('/signin')
      }
      toast.error(`Error: ${err}`);
    }
  };


  return (
    <DefaultLayout>
      <Breadcrumb pageName={`Edit Events Details`} />
      <form onSubmit={handleEdit}>
        <div>
          <label htmlFor='title' className="mb-3 block text-black dark:text-white">Title</label>
          <input
            name="title"
            id='title'
            type="text"
            ref={titleRef}
            defaultValue={data?.title}
            placeholder="Title"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="mt-4">
        <label htmlFor='facultyID' className="mb-3 block text-black dark:text-white">Faculty Id</label>
          <input
            name="title"
            id='facultyID'
            type="text"
            ref={facultyRef}
            defaultValue={data?.faculty._id}
            placeholder="Faculty ID"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
      </div>
      <div className="mt-4">
        <label htmlFor='children' className="mb-3 block text-black dark:text-white">|Children</label>
          <input
            name="title"
            id='children'
            type="text"
            ref={childrenRef}
            defaultValue={data?.children.toString()}
            placeholder="Childern Id seperated with ,"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
      </div>
        <button className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
          Update Organization
        </button>
      </form>
    </DefaultLayout>
  );
};

export default OrganizationEdit;
