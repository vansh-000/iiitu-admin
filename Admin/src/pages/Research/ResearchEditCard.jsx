import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../../utils/apiURl';
import axios from 'axios';
import toast from 'react-hot-toast';
import { StaticLinkProvider } from '../../utils/StaticLinkProvider';

const ResearchEditCard = ({ research, fetchData, index }) => {
  const [editable, setEditable] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [selectedType, setSelectedType] = useState(research.type);
  const [isOptionSelected, setIsOptionSelected] = useState(false);

  const navigate = useNavigate();
  const refTitle = useRef();
  const refDescription = useRef();
  const refUniversity = useRef();
  const refUniversityImage = useRef();
  const refFile = useRef();
  const refUniversityLink = useRef();

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const handleEdit = (research) => {
    setEditedData(research);
    setEditable(true);
  };

  const handleSave = async () => {
    try {
      const data = {
        title: refTitle.current?.value || editedData.title,
        description: refDescription.current?.value || editedData.description,
        type: selectedType,
        university: refUniversity.current?.value || editedData.university,
        universityLink:
          refUniversityLink.current?.value || editedData.universityLink,
        image: refUniversityImage.current?.files[0],
        file: refFile.current?.files[0],
      };
      const response = await axios.put(
        `${API}/research/${editedData._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchData();
      }
    } catch (err) {
      // console.error(err);
      if (err.response?.status === 401) {
        return navigate('/signin');
      }
      toast.error(`Error: ${err.message}`);
    }
    setEditable(false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API}/research/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success(response.data.message);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      className="flex mx-2 w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-7 py-8 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-9"
      key={index}
    >
      <div className="w-full">
        <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
          {editable ? (
            <input
              type="text"
              defaultValue={research.title}
              ref={refTitle}
              className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:bg-form-input dark:text-white"
            />
          ) : (
            research.title
          )}
        </h5>

        <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
          {editable ? (
            <input
              type="text"
              defaultValue={research.description}
              className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:bg-form-input dark:text-white"
              ref={refDescription}
            />
          ) : (
            research.description
          )}
        </h5>
        <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
          {editable ? (
            <input
              type="text"
              defaultValue={research.university}
              className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:bg-form-input dark:text-white"
              ref={refUniversity}
            />
          ) : (
            research.university
          )}
        </h5>
        <h5 className="mb-3 text-lg font-semibold text-[#9D5425]">
          {editable ? (
            <div className="relative">
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
                <option value="MOU" className="text-body dark:text-bodydark">
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
          ) : (
            research.type
          )}
        </h5>

        <div className="flex flex-row gap-4 flex-wrap leading-relaxed text-[#D0915C]">
          <div>
            {editable ? (
              <>
                <label
                  htmlFor="universityLink"
                  className="mb-3 block text-black dark:text-white"
                >
                  University Link
                </label>
                <input
                  id="universityLink"
                  type="text"
                  defaultValue={research.universityLink}
                  ref={refUniversityLink}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
              </>
            ) : (
              <Link
                to={research.universityLink}
                className="inline-flex h-fit items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                University Link
              </Link>
            )}
          </div>
          {editable ? (
            <>
              <label
                htmlFor="file"
                className="mb-3 block text-black dark:text-white"
              >
                File
              </label>
              <input
                id="file"
                accept=".pdf"
                type="file"
                ref={refFile}
                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
              />
            </>
          ) : (
            <Link
              to={StaticLinkProvider(research.file)}
              className="inline-flex h-fit items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              File
            </Link>
          )}
        </div>
        <div className="flex flex-row items-center gap-4 mt-4">
          {editable ? (
            <>
              <label
                htmlFor="universityImage"
                className="mb-3 block text-black dark:text-white"
              >
                University Image
              </label>
              <input
                className="w-1/2 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                type="file"
                id="universityImage"
                name="universityImage"
                accept="image/*"
                ref={refUniversityImage}
              />
            </>
          ) : (
            <img
              src={StaticLinkProvider(research.universityImage)}
              alt={research.universityImage}
              className="h-[25%] w-[25%] inline-flex items-center justify-center rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            />
          )}

          <button
            className="inline-flex h-fit items-center justify-center rounded-md bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={editable ? handleSave : () => handleEdit(research, index)}
          >
            {editable ? 'Save' : 'Edit'}
          </button>
          <button
            onClick={() => handleDelete(research._id)}
            className="inline-flex h-fit items-center justify-center rounded-md bg-danger py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResearchEditCard;
