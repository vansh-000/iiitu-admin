import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableGallery from '../components/Tables/TableGallery';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { API } from '../utils/apiURl';
import TableCurriculum from '../components/Tables/TableCurriculum';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
const Curriculum = () => {
  const [data, setData] = useState();
  const token=localStorage.getItem('token');
  const navigate=useNavigate();
  const {Allow}=jwtDecode(token);
  // console.log(Allow`);
  useEffect(()=>{
  if(!Allow?.[1]){
    navigate('/news');
  }},[])
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/courses`);
      setData(response.data.courses);
    }
    catch (err) {
      console.error(err);
    }
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const [pdf, setPdf] = useState([]);
  const batchRef = useRef();
  const branchRef = useRef()
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setPdf(files);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const batch = batchRef.current.value;
    const branch = branchRef.current.value;
    try {
      const formData = new FormData();
      pdf.forEach((doc) => {
        formData.append("coursePdf", doc);
      });
      formData.append("title", batch);
      formData.append("description", branch);
      await axios.post(`${API}/courses`, formData, {
        headers: {
          "Authorization":`Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      toast.success("Curriculum Uploaded!");
      fetchData();
    }
    catch (err) {
      if(err.response.status===401){
        return navigate('/signin')
      }
      toast.error(`Error: ${err}`);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/courses/${id}`,{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      toast.success("Curriculum Deleted!");
      fetchData();
    }
    catch (err) {
      if(err.response.status===401){
        return navigate('/signin')
      }
      toast.error(`Error: ${err}`);
    }
  }

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Curriculum" />
      <form onSubmit={handleAdd}>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Batch/Year
          </label>
          <input
            name="title"
            type="text"
            ref={batchRef}
            placeholder="Batch/Year (e.g. 2022-26)"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className='mt-4'>
          <label className="mb-3 block text-black dark:text-white">
            Branch
          </label>
          <input
            name="description"
            ref={branchRef}
            type="text"
            placeholder="Branch (e.g. CSE)"
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
            name="image"
            onChange={handleFileChange}
            accept=".pdf"
            required
          />
        </div>
        <button
          className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Curriculum
        </button>
      </form>
      <div className="flex flex-col gap-10 mt-5">
        {data?.length > 0 ? (
          <TableCurriculum data={data} handleDelete={handleDelete} />
        ) : (
          <h1 className="text-black dark:text-white text-2xl mt-4">No Curriculum Present!</h1>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Curriculum;