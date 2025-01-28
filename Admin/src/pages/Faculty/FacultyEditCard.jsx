import React, { useState, useEffect } from 'react';
import { API, STATIC_FILES } from '../../utils/apiURl';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { StaticLinkProvider } from '../../utils/StaticLinkProvider';
import ConfirmationModal from '../../utils/ConfirmationModal';

const FacultyEditCard = ({ faculty, fetchData }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacultyId, setSelectedFacultyId] = useState(null);
  const [isActive, setIsActive] = useState(faculty.isActive);

  const handleToggle = async (id) => {
    setIsActive((prev) => !prev);
    try {
      const response = await axios.put(
        `${API}/faculty/isActive/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      if (response.data.success) {
        toast.success('Faculty Status Updated!');
        fetchData();
      } else {
        toast.error('Failed to update status. Please try again.');
      }
    } catch (err) {
      console.error(err);

      if (err?.response?.status === 401) {
        return navigate('/signin');
      }
      toast.error(
        err?.response?.data?.error || 'An error occurred. Please try again.',
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/faculty/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Faculty Deleted!');
      fetchData();
    } catch (err) {
      console.log(err);

      if (err?.response?.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  };

  const openModal = (id) => {
    setSelectedFacultyId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFacultyId(null);
  };

  const confirmDelete = () => {
    if (selectedFacultyId) {
      handleDelete(selectedFacultyId);
      closeModal();
    }
  };

  return (
    <>
      <div
        key={faculty._id}
        className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9"
      >
        <div className="mr-5 flex h-[100px] w-[100px] items-center justify-center rounded-lg bg-[#34D399]">
          <img
            src={StaticLinkProvider(faculty.profileImage)}
            alt="profile pic"
            className="h-full w-full object-cover rounded-lg"
          />
        </div>

        <div className="w-full">
          <h5 className="mb-3 text-lg font-semibold text-black dark:text-[#34D399] ">
            {faculty.name}
          </h5>
          <p className="text-base leading-relaxed text-body">
            Email: {faculty.email}
          </p>
          <p className="text-base leading-relaxed text-body">
            Department: {faculty.department}
          </p>

          <Link
            to={`/faculty/edit/${faculty._id}`}
            className="inline-flex mt-1 items-center mr-2 justify-center rounded-md bg-danger py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Edit
          </Link>
          <button
            onClick={() => openModal(faculty._id)}
            className="inline-flex items-center justify-center rounded-md bg-danger py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Delete
          </button>
          <label className="inline-flex items-center p-5  me-5 cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={faculty.isActive}
              onChange={() => handleToggle(faculty._id)}
            />
            <div
              className={`relative w-11 h-6 rounded-full transition-all ${
                faculty.isActive ? 'bg-danger' : 'bg-gray-200'
              } peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800`}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full transition-transform bg-white ${
                  faculty.isActive ? 'translate-x-full' : 'translate-x-0'
                }`}
              />
            </div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {faculty.isActive ? 'Active' : 'Inactive'}
            </span>
          </label>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmDelete}
        title="Delete Faculty"
        message="Are you sure you want to delete this faculty? This action cannot be undone."
      />
    </>
  );
};

export default FacultyEditCard;
