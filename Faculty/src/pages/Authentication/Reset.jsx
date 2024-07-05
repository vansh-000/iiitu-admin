import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import axios from 'axios';
import { API } from '../../utils/apiURl';
import toast from 'react-hot-toast';

const Reset = () => {
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const email = localStorage.getItem("email");

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${API}/faculty/resetpassword`, { email, newPassword }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('verifyToken')}`
                }
            });
            if (response.status === 200) {
                toast.success("Password Changed Successfully!");
                localStorage.removeItem("email");
                localStorage.removeItem("verifyToken");
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response.status === 500) {
                toast.error("Internal Server Error!");
                setLoading(false);
            } else if (error.response && error.response.status === 404) {
                toast.error("User not found!");
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        if (!email) {
            navigate("/dashboard");
        }
    }, [email, navigate]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Forgot Password" />

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="flex flex-wrap items-center">
                    <div className="hidden w-full xl:block xl:w-1/2">
                        <div className="p-10">
                            <div className="flex flex-col items-center">
                                <img
                                    src="/iiitu-logo.png"
                                    className="w-40 h-40"
                                    alt="IIITU Logo"
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
                                Enter New Password
                            </h2>

                            <form onSubmit={handleChangePassword}>
                                <div className="mb-4">
                                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            required
                                            placeholder="Enter New Password"
                                            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        <span className="absolute right-4 top-4">
                                            <svg
                                                className="fill-current"
                                                width="22"
                                                height="22"
                                                viewBox="0 0 22 22"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                {/* Your SVG icon */}
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-7 text-end">
                                    <Link
                                        type="button"
                                        to="/forgot"
                                        className="text-primary hover:text-blue-500"
                                        onClick={() => localStorage.removeItem('email')}
                                    >
                                        Change Email
                                    </Link>
                                </div>

                                <div className="mb-5">
                                    <button
                                        type="submit"
                                        className="w-full h-16 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                                    >
                                        {loading ? (
                                            <div className="inline-block h-7 w-7 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                                        ) : (
                                            <span>Change Password</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Reset;