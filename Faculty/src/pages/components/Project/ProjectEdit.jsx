import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DefaultLayout from '../../../layout/DefaultLayout';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { API } from '../../../utils/apiURl';
import toast from 'react-hot-toast';
const STATUS=["Ongoing", "Completed"];
const TYPE=["Research", "Consultancy"];
function ProjectEdit() {
    const { id } = useParams();const navigate = useNavigate();
    const token = localStorage.getItem('token');
    // const [selectedStatus, setSelectedStatus] = React.useState('');
    // const [type, settype] = React.useState('');
    const refTitle = useRef();
    const refInvestigator = useRef();
    const refCoInvestigator = useRef();
    const refFundingAgency = useRef();
    const refDuration = useRef();
    const refAmount = useRef();
    const [status, setStatus] = useState();
    const [type, setType] = useState();
    const [investigator, setInvestigator] = useState();
    const [coInvestigator, setCoInvestigator] = useState();
    const [data,setData]=useState();
    const handleStatusChange = (e) => {
        const value = e.target.value;
        // setSelectedStatus(value);
        setStatus(value);
    };
    const handleTypeChange = (e) => {
        const value = e.target.value;
        // settype(value);
        setType(value);
    };
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/project/${id}`);
        const data=response?.data?.Projects;
        setData(data);
        setInvestigator(data?.investigator?.toString()?.replace(/,/g,';'));
        setCoInvestigator(data?.coInvestigator?.toString()?.replace(/,/g,';'));
        setStatus(data?.status);
        setType(data?.type);
        
      } catch (err) {
        console.error('error in edit courses', err);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleEdit = async (e) => {
      e.preventDefault();
      const invest = refInvestigator?.current?.value;
      const coInvest = refCoInvestigator?.current?.value;
      const investigator = invest.split(';');
      const coInvestigator = coInvest.split(';');
const title= refTitle?.current?.value;
      if (!title) {
        return toast.error('Title is required');
      }
  
      const updatedProject = {
        title: title,
        investigator: investigator,
        coInvestigator: coInvestigator,
        fundingAgency: refFundingAgency?.current?.value,
        duration: refDuration?.current?.value,
        amount: refAmount?.current?.value,
        status: status,
        type: type,
      };
      
// console.log(updatedProject);

  
      try {
        const response = await axios.put(`${API}/project/${id}`, updatedProject, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  // console.log(response);
  
        if (response.status === 200) {
          toast.success(`Publication updated successfully!`);
          return navigate('/dashboard');
        }
      } catch (err) {
        if (err.response.status === 401) {
          return navigate('/signin');
        }
        toast.error(`Error: ${err}`);
      }
    };
  
    return (
      <DefaultLayout>
        <Breadcrumb pageName={`Edit Project Details`} />
        <form onSubmit={handleEdit}>
        <div>
      <label className="mb-3 block text-black dark:text-white">
        Title:
        <input
          name="title"
          type="text"
          ref={refTitle}
          defaultValue={data?.title}
          placeholder="Title"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>

      <label className="mb-3 block text-black dark:text-white">
        Investigator (For Multiple Investigator use ; to separate):
        <input
          name="Investigator"
          type="text"
          ref={refInvestigator}
          defaultValue={investigator}
          placeholder="eg: Rishvant; Anurag; Pundir"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      <label className="mb-3 block text-black dark:text-white">
        Co-Investigator (For Multiple Co-Investigator use ; to separate):
        <input
          name="Co-Investigator"
          type="text"
          ref={refCoInvestigator}
          defaultValue={coInvestigator}
          placeholder="eg: Rishvant; Anurag; Pundir"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>

      <label className="mb-3 block text-black dark:text-white">
        Funding Agency
        <input
          name="FundingAgency"
          type="text"
          ref={refFundingAgency}
          defaultValue={data?.fundingAgency}
          placeholder="Enter Funding Agency"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>
      <label className="mb-3 block text-black dark:text-white">
        Duration
        <input
          name="Duration"
          type="text"
          ref={refDuration}
          defaultValue={data?.duration}
          placeholder="Enter Duration"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>

      <label className="mb-3 block text-black dark:text-white">
        Amount
        <input
          name="amount"
          type="text"
          ref={refAmount}
          defaultValue={data?.amount}
          placeholder="eg.12333"
          className="ml-2 mt-2 w-auto rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </label>

      <label className="mb-3 block text-black dark:text-white">
        Status
        <select
          value={status}
          onChange={handleStatusChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-8 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            status ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select Status
          </option>
          {STATUS.map((sta, index) => (
            <option key={index} value={sta} className="text-body dark:text-bodydark">
              {sta}
            </option>
          ))}
        </select>
      </label>

      <label className="mb-3 block text-black dark:text-white">
        Type
        <select
          value={type}
          onChange={handleTypeChange}
          className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-8 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
            type ? 'text-black dark:text-white' : ''
          }`}
        >
          <option value="" disabled className="text-body dark:text-bodydark">
            Select Type
          </option>
          {TYPE.map((typ, index) => (
            <option key={index} value={typ} className="text-body dark:text-bodydark">
              {typ}
            </option>
          ))}
        </select>
      </label>
    </div>
    <button className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
          Update Project
        </button>
    </form>

</DefaultLayout>
  )
}

export default ProjectEdit