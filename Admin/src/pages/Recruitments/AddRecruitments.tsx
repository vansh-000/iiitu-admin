import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../utils/apiURl';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableDate from '../../components/Tables/TableDate.jsx';
import TableLink from '../../components/Tables/TableLink.jsx';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';

const AddRecruitments = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [date, setDate] = useState([]);
  const [file, setFile] = useState([]);
  const [linkList, setLinkList] = useState([]);

  useEffect(() => {
    if (!token) {
      return navigate('/signin');
    }
    const { Allow } = jwtDecode(token);
    if (!Allow?.[10]) {
      navigate('/minutes');
    }
  }, []);

  const refDesc = React.useRef<HTMLInputElement>();
  // const refAppLink = React.useRef();
  // const refAppForm = React.useRef();
  // const refRecruitmentDoc = React.useRef<HTMLInputElement>();
  // const refApplicationDoc = React.useRef<HTMLInputElement>();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Append the service description to the formData
      // formData.append('service', refDesc.current!.value);

      // Filter and append Date and LinkList as JSON strings (since FormData doesn't accept objects directly)
      const sendDate = date.filter(
        (dat) => dat.DateName !== '' && dat.Date !== null,
      );
      // formData.append('Date', JSON.stringify(sendDate));

      const LinkList = linkList.filter(
        (link) => link.URL !== '' && link.LinkName !== '',
      );
      const data = {
        service: refDesc.current!.value,
        Date: sendDate,
        LinkList: LinkList,
      };
      // Make the POST request
      const response = await axios.post(
        `${API}/recruitment`,
        data, // Send formData directly
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            // 'Content-Type': 'multipart/form-data'  // No need to set this manually
          },
        },
      );

      if (response.status === 201) {
        toast.success(response.data.message);
        navigate('/recruitment/edit');
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        return navigate('/signin');
      }
      console.error(err);
      toast.error(`Error: ${err.message || 'Something went wrong'}`);
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
            {/* <div className=""> */}
            <TableDate Date={date} setDate={setDate} />
            {/* <div className="w-fit">
                <label
                  htmlFor="description"
                  className="mb-3 block text-black dark:text-white"
                >
                  Start Date
                </label>

                <DatePickerOne refDate={startDateRef} />
              </div> */}
            {/* <div className="w-fit">
                <label
                  htmlFor="description"
                  className="mb-3 block text-black dark:text-white"
                >
                  End Date
                </label>

                <DatePickerOne refDate={endDateRef} />
              </div> */}
            {/* </div> */}
            <div>
              {/* <TableFile File={file} setFile={setFile}/> */}
              {/* <label
               htmlFor="description"
               className="mb-3 block text-black dark:text-white"
             >
                 Attach Application Form
               </label> */}
              {/* <input
                id="description"
                accept="application/*"
                type="file"
                ref={refApplicationDoc}
                className="w-fit cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              /> */}
            </div>
            <TableLink Link={linkList} setLink={setLinkList} />

            {/* <div>
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
            </div> */}
            {/* <div className="">
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
            </div> */}
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
