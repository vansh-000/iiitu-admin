import React from 'react';
import { API, STATIC_FILES } from '../../utils/apiURl';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const FacultyEditCard = ({ faculty, fetchData }) => {
  const navigate=useNavigate();
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/faculty/delete/${id}`,{
        headers: {
           Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success("Faculty is Deleted");
      fetchData();
    } catch (err) {
      console.log(err);
      
      if (err?.response?.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err}`);
    }
  };
  return (
    <>
      
      <div key={faculty._id} className="flex w-full border-l-6 border-[#34D399] bg-[#34D399] bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9">
        <div className="mr-5 flex h-[100px] w-[100px] items-center justify-center rounded-lg bg-[#34D399]">
          <img
            src={faculty.profileImage}
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
            onClick={() => handleDelete(faculty._id)}
            className="inline-flex items-center justify-center rounded-md bg-danger py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Delete
          </button>
        </div>
      </div>
      
    </>
  );
};

export default FacultyEditCard;