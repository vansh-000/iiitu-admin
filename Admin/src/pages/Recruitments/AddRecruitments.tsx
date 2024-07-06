import React, { FormEvent, useEffect } from 'react';
import axios from 'axios';
import { API } from '../../utils/apiURl';
import DatePickerOne from '../../components/Forms/DatePicker/DatePickerOne';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
const AddRecruitments = () => {
  const navigate = useNavigate();
  const token=localStorage.getItem('token');
  const {Allow}=jwtDecode(token);
  useEffect(()=>{
    if(!Allow?.[10]){
      navigate('/profile');
    }
  },[]);
  const startDateRef = React.useRef<HTMLInputElement>(null);
  const endDateRef = React.useRef<HTMLInputElement>(null);
  const refDesc = React.useRef<HTMLInputElement>();
  const refAppLink = React.useRef();
  const refAppForm = React.useRef();
  const refRecruitmentDoc = React.useRef<HTMLInputElement>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/recruitment`,
        {
          service: refDesc.current!.value,
          RecruitmentDoc: refRecruitmentDoc.current!.files[0],
          startDate: startDateRef.current!.value,
          endDate: endDateRef.current!.value,
          ApplicationLink: refAppLink.current.value,
          ApplicationForm: refAppForm.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      toast.success(response.data.message);
    } catch (err) {
      if (err.response.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Recruitment" />
      <form onSubmit={handleSubmit}>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label
                htmlFor="description"
                className="mb-3 block text-black dark:text-white"
              >
                Description of Recruitment
              </label>
              <input
                id="description"
                type="text"
                placeholder="Description of Recruitment"
                required="required"
                ref={refDesc}
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>
            <div className="flex justify-between">
              <div className="w-fit">
                <label
                  htmlFor="description"
                  className="mb-3 block text-black dark:text-white"
                >
                  Start Date
                </label>

                <DatePickerOne refDate={startDateRef} />
              </div>
              <div className="w-fit">
                <label
                  htmlFor="description"
                  className="mb-3 block text-black dark:text-white"
                >
                  End Date
                </label>

                <DatePickerOne refDate={endDateRef} />
              </div>
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-3 block text-black dark:text-white"
              >
                Application Form
              </label>
              <input
                id="description"
                type="text"
                placeholder="Description of Recruitment"
                ref={refAppForm}
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="mb-3 block text-black dark:text-white"
              >
                Application Link
              </label>
              <input
                id="description"
                type="text"
                placeholder="Description of Recruitment"
                ref={refAppLink}
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>
            <div className="">
              <label
                htmlFor="RecruitmentDoc"
                className="mb-3 block text-black dark:text-white"
              >
                Attach Recruitment Doc
              </label>
              <input
                id="RecruitmentDoc"
                required="required"
                accept=".pdf"
                type="file"
                ref={refRecruitmentDoc}
                className="w-fit cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div>
            <div>
              <button
                type="submit"
                className="inline-flex items-center mt-4 justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Add Recruitment
              </button>
            </div>
          </div>
        </div>
      </form>
    </DefaultLayout>
  );
};

export default AddRecruitments;