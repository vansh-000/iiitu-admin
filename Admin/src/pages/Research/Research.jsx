import React, { useRef, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import axios from 'axios';
import { API } from '../../utils/apiURl';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

function Research() {
  const refTitle = useRef();
  const refDescription = useRef();
  const refUniversity = useRef();
  const refUniversityImage = useRef();
  const refFile = useRef();
  const refUniversityLink = useRef();
  const navigate=useNavigate();
  const token=localStorage.getItem('token');
  useEffect(()=>{
    if(!token){
      return navigate('/signin');}
    const {Allow}=jwtDecode(token);
    if(!Allow?.[9]){
      navigate('/recruitment/edit');
    }
  },[]);
 
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        title: refTitle.current.value,
        description: refDescription.current.value,
        type: selectedType,
        university: refUniversity.current.value,
        universityLink: refUniversityLink.current.value,
        image: refUniversityImage.current.files[0],
        file: refFile.current.files[0],
      };

      const response = await axios.post(`${API}/research`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response.status===201){
        toast.success(response.data.message);
     }
    } catch (err) {
      if (err.response.status === 401) {
        return navigate('/signin');
      }
      if(err.response.status>=410&&err.response.status<=430){
        return toast.error(err.response.data.message);
      }
      toast.error(`Error: ${err}`);
    }
  };
  const [selectedType, setSelectedType] = useState('');
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const changeTextColor = () => {
    setIsOptionSelected(true);
  };
  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Research Registration" />
        <h2>Research Registration</h2>
        <form onSubmit={handleOnSubmit}>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label
                  className="mb-3 block text-black dark:text-white"
                  htmlFor="Title"
                >
                  Title:
                </label>

                <input
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  type="text"
                  id="Title"
                  name="Title"
                  ref={refTitle}
                  required
                />
              </div>

              <label
                className="mb-3 block text-black dark:text-white"
                htmlFor="Description"
              >
                Description:
              </label>

              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="text"
                id="Description"
                name="Description"
                ref={refDescription}
                required
              />

              <div className="flex flex-col gap-5.5 p-6.5">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Select Type
                  </label>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <span className="absolute top-1/2 left-4 z-30 -translate-y-1/2">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                            fill="#637381"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                            fill="#637381"
                          ></path>
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>

                    <select
                      value={selectedType}
                      onChange={(e) => {
                        setSelectedType(e.target.value);
                        changeTextColor();
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                        isOptionSelected ? 'text-black dark:text-white' : ''
                      }`}
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        Select Type
                      </option>
                      <option
                        value="MOU"
                        className="text-body dark:text-bodydark"
                      >
                        MOU
                      </option>
                      <option
                        value="Research"
                        className="text-body dark:text-bodydark"
                      >
                        Research
                      </option>
                    </select>

                    <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#637381"
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <label
                className="mb-3 block text-black dark:text-white"
                htmlFor="University"
              >
                University
              </label>

              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="text"
                id="University"
                name="University"
                ref={refUniversity}
              />

              <label
                className="mb-3 block text-black dark:text-white"
                htmlFor="UniversityLink"
              >
                University Link
              </label>

              <input
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                type="text"
                id="UniversityLink"
                name="UniversityLink"
                ref={refUniversityLink}
              />
              <label
                className="mb-3 block text-black dark:text-white"
                htmlFor="universityImage"
              >
                University Image:
              </label>

              <input
                className="w-1/2 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                type="file"
                id="universityImage"
                name="universityImage"
                accept="image/*"
                ref={refUniversityImage}
                required
              />

              <label
                className="mb-3 block text-black dark:text-white"
                htmlFor="file"
              >
                File:
              </label>

              <input
                className="w-1/2 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                type="file"
                id="file"
                name="file"
                accept=".pdf"
                ref={refFile}
                required
              />
              <div>
                <input
                  className="inline-flex items-center mt-4 justify-center rounded-full bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 hover:cursor-pointer"
                  type="Submit"
                  value="Add Research"
                />
              </div>
            </div>
          </div>
        </form>
      </DefaultLayout>
    </>
  );
}

export default Research;