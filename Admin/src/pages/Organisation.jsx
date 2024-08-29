
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../utils/apiURl';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import TableOrganization from '../components/Tables/TableOrganization.jsx';
const Organization = () => {
  const [data, setData] = useState();
  const token=localStorage.getItem('token');

  const navigate=useNavigate();
  useEffect(()=>{
    if (!token) {
      navigate('/signin');
    }
    const {Allow}=jwtDecode(token);
    if(!Allow?.[14]){
    navigate('/profile');
  }},[])
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/orgStr`);
      console.log(response.data);
      
      setData(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  const titleRef = useRef();
  const linkRef=useRef();
  const childrenRef=useRef();
  const refColor=useRef();
  const handleAdd = async (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const link = linkRef.current.value;
    const children = childrenRef.current.value;
    const childrenArray = children.length>0?children.split(','):[];


    try {
        const data = {"title": title,
"link":link,
"children":childrenArray,
"color":refColor.current.value.substring(1)
        };
        
        // console.log(data,children);
        
        
        // Append children one by one
      
        await axios.post(`${API}/orgStr`, data, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        });
        toast.success("Organisation Added Uploaded!");
        fetchData();
    } catch (err) {
        if (err.response && err.response.status === 401) {
            return navigate('/signin');
        }
        toast.error(`Error: ${err.message}`);
    }
}


  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/orgStr/${id}`,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      toast.success("Organization Deleted!");
      fetchData();
    }
    catch (err) {
      if(err?.response?.status===401){
        return navigate('/signin')
      }
      toast.error(`Error: ${err}`);
    }
  }


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Organization" />
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
            Link
          </label>
          <input
            name="Link"
            type="text"
            ref={linkRef}
            placeholder="Link"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className='mt-4'>
          <label className="mb-3 flex content-center gap-x-2 text-black dark:text-white">
            Color
          <input
            name="color"
            type="color"
            ref={refColor}
            defaultValue="#ffffff"
          /></label>
        </div>
        <div className="mt-4">
          <label className="mb-3 block text-black dark:text-white">
            Children
          </label>
          <input
            name="Children"
            type="text"
            ref={childrenRef}
            placeholder="children ID seprated with (,)"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <button
          className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Organization
        </button>
      </form>
      <div className="flex flex-col gap-10 mt-5">
        <TableOrganization data={data} handleDelete={handleDelete} />
      </div>
    </DefaultLayout>
  );
};

export default Organization;