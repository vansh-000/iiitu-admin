import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { API } from '../../../Faculty/src/utils/apiURl';
import { useNavigate, useParams } from 'react-router-dom';
const CurriculumPage = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  const refCoursePdf=useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
 
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/courses/${id}`);
      setData(response.data.course);

    } catch (err) {
      console.error('error in edit courses', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const batchRef = useRef();

  const handleEdit = async (e) => {
    e.preventDefault();
    const batch = batchRef.current.value;
    const data2={
        'batch':batch,
        'coursePdf':refCoursePdf.current?.files[0],
        'OldCoursePdf':null
      }
      if(refCoursePdf.current?.files[0]){
        data2['OldCoursePdf']=data.coursePdf;
      }
    try {
     const response= await axios.put(`${API}/courses/${id}`, data2, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
    
    if(response.status===200){
        toast.success(`Curriculum updated successfully!`);
        return navigate('/curriculum');
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
      <Toaster />
      <form onSubmit={handleEdit}>
        <div>
          <label className="mb-3 block text-black dark:text-white">Batch/Year</label>
          {data&&data.title&&<input
            name="batch"
            type="text"
            ref={batchRef}
            defaultValue={data.title}
            placeholder="Batch/Year(eg.2020-2024)"
            required
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />}
        </div>
        <div className="mt-4">
        <label htmlFor="eventLogo" className="mb-3 block text-black dark:text-white">Change Attach PDF
        </label>
      <input
        id="eventLogo"
        type="file"
        accept=".pdf"
        ref={refCoursePdf}
        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
      />
      </div>
        <button className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
          Update Curriculum
        </button>
      </form>
    </DefaultLayout>
  );
};

export default CurriculumPage;
