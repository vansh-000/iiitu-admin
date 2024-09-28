import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { API } from '../../utils/apiURl';
import toast from 'react-hot-toast';
import { jwtDecode } from 'jwt-decode';
import { IoClose } from 'react-icons/io5';

const ResetPassword = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { exp } = jwtDecode(token);
      if (exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const id = JSON.parse(localStorage.getItem('user'))?.id;
  // console.warn(id);

  const [loading, setLoading] = useState(false);

  const refOldPassword = useRef();
  const refNewPassword = useRef();
  const refConfirmPassword = useRef();

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const oldPassword = refOldPassword.current.value;
    const newPassword = refNewPassword.current.value;
    const confirmPassword = refConfirmPassword.current.value;

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (newPassword === oldPassword) {
      toast.error("Old and New Password can't be same.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.put(`${API}/faculty/change-Password/${id}`, {
        oldPassword: oldPassword,
        newPassword: newPassword,
      });
      // console.log("======", response);
      if (response.status === 200) {
        toast.success('Password changed successfully!');
        // localStorage.setItem('token', response.data.accessToken);
        // localStorage.setItem('user', JSON.stringify(response.data.userInfo));
        navigate('/dashboard');
      }
    } catch (error) {
      console.warn(error);
      if (error.response?.status === 409) {
        toast.error('User not found!');
      } else if (error.response?.status === 403) {
        toast.error('Incorrect old password!');
      } else {
        toast.error('Internal Server Error!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-auto">
      {/* <Breadcrumb pageName="Reset Password" /> */}

      <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center relative">
          <div className="hidden w-full xl:block xl:w-1/2">
            <div className="p-10">
              <Link className="mb-5.5 inline-block" to="/"></Link>
              <div className="flex flex-col items-center">
                <img
                  src="/iiitu-logo.png"
                  className="w-40 h-40"
                  alt="IIIT Una Logo"
                />

                <p className="2xl:px-10 mt-10 text-black font-semibold dark:text-white">
                  Indian Institute of Information Technology Una
                </p>
                <h1 className="text-4xl text-black font-semibold dark:text-white mt-4">
                  Welcome to Faculty Portal!
                </h1>
              </div>
            </div>
          </div>

          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Reset Your Password
              </h2>

              <form onSubmit={handleOnSubmit}>
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Enter Old Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter your old password"
                      ref={refOldPassword}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Enter New Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Enter your new password"
                      ref={refNewPassword}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      placeholder="Confirm your new password"
                      ref={refConfirmPassword}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-4 w-full rounded-lg bg-primary p-4 text-white hover:bg-primary-dark transition"
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
