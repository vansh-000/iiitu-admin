import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../layout/DefaultLayout';
import React, { useRef ,useState,useEffect} from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { API } from '../utils/apiURl';
import { jwtDecode } from 'jwt-decode';

const EditProfile = () => {
  const deptRef = useRef();
  const mobileRef = useRef();
  const researchRef = useRef();
  const token = localStorage.getItem("token");
  var decode = null;
  if (token) {
    decode = jwtDecode(token);
  }
  const id = decode?.id;
  const handleEmpty = () => {
    deptRef.current.value = '';
    mobileRef.current.value = '';
    researchRef.current.value = '';
  }
  const handleUpdate = async (e) => {
    e.preventDefault();
    const department = deptRef.current.value;
    const mobile = mobileRef.current.value;
    const research = researchRef.current.value;
    try {
      const formData = new FormData();
      formData.append("department", department);
      formData.append("mobile", mobile);
      formData.append("researchInterest", research);
      const res = await axios.post(`${API}/editDetails/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      handleEmpty();
      toast.success("Profile Updated!");
    }
    catch (err) {
      toast.error(err.message);
      console.log("Error:", err);
    }
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Profile" />
      <form onSubmit={handleUpdate}>
        <div>
          <label className="mb-3 block text-black dark:text-white">
            Department
          </label>
          <input
            name="department"
            type="text"
            ref={deptRef}
            placeholder="Department"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className='mt-4'>
          <label className="mb-3 block text-black dark:text-white">
            Mobile No.
          </label>
          <input
            name="mobile"
            ref={mobileRef}
            type="number"
            placeholder="Mobile No."
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className='mt-4'>
          <label className="mb-3 block text-black dark:text-white">
            Research Interests
          </label>
          <input
            name="research"
            ref={researchRef}
            type="text"
            placeholder="Research Interests"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>

        <button
          className="inline-flex items-center justify-center rounded-full bg-black mt-2 py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Update Profile
        </button>
      </form>
    </DefaultLayout>
  );
};

export default EditProfile;