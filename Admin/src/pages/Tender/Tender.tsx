import React, { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../utils/apiURl';
import TableDate from '../../components/Tables/TableDate.jsx';
// import TableFile from "../../components/Tables/TableFile.jsx"
import TableLink from '../../components/Tables/TableLink.jsx';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function Tender(): JSX.Element {
  const startDateRef = React.useRef<HTMLInputElement>(null);
  const endDateRef = React.useRef<HTMLInputElement>(null);
  const refDesc = React.useRef<HTMLInputElement>();
  const refTenderDoc = React.useRef<HTMLInputElement>();
  const refAnnexure = React.useRef<HTMLInputElement>();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      return navigate('/signin');
    }
    const { Allow } = jwtDecode(token);
    if (!Allow?.[8]) {
      navigate('/research/add');
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append service and other text data
      formData.append('service', refDesc.current!.value);

      // Append date information directly as objects, not as a string
      const sendDate = date.filter(
        (dat) => dat.DateName !== '' && dat.Date !== null,
      );
      const LinkList = linkList.filter(
        (link) => link.URL !== '' && link.LinkName !== '',
      );

      const data = {
        service: refDesc.current!.value,
        Date: sendDate,
        LinkList: LinkList,
      };
      const response = await axios.post(`${API}/tender`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setLoading(false);
      toast.success(response.data.message);
      if (response.status === 201) {
        toast.success(response.data.message);
        navigate('/tender/edit');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        return navigate('/signin');
      }
      setLoading(false);
      console.error(err);
      toast.error(`Error: ${err}`);
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Tender" />
      <form onSubmit={handleSubmit}>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label
                htmlFor="description"
                className="mb-3 block text-black dark:text-white"
              >
                Description of Tender
              </label>
              <input
                id="description"
                type="text"
                placeholder="Description of Tender"
                required="required"
                ref={refDesc}
                className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
              />
            </div>
            <TableDate Date={date} setDate={setDate} />

            {/* 
            <div>
            <TableFile File={file} setFile={setFile}/>

            </div> */}
            <TableLink Link={linkList} setLink={setLinkList} />
            {/* <div>
              <label
                htmlFor="annexure"
                className="mb-3 block text-black dark:text-white"
              >
                Attach Annexure
              </label>
              <input
                id="annexure"
                ref={refAnnexure}
                accept=".pdf"
                type="file"
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </div> */}
            <div>
              <button
                disabled={loading}
                className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                {loading ? (
                  <div className="inline-block h-5 w-5 animate-spin rounded-full border-[0.2rem] border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                ) : (
                  <span>Add Tender</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </DefaultLayout>
  );
}

export default Tender;
